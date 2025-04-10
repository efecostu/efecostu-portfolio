"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const CrabCursorFollower = () => {
    const containerRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current || isInitialized) return;

        // Set up Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);

        // Create crab geometry
        const crab = new THREE.Group();

        // Create the body (center)
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 8);
        const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1 }); // Blue color
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        crab.add(body);

        // Create the inner circle
        const innerCircleGeometry = new THREE.CircleGeometry(0.2, 32);
        const innerCircleMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 }); // Orange color
        const innerCircle = new THREE.Mesh(innerCircleGeometry, innerCircleMaterial);
        innerCircle.position.set(0, 0, 0.15);
        crab.add(innerCircle);

        // Create legs (8 legs, similar to your reference image)
        const legLength = 0.8;
        const legPositions = [
            { angle: 0, offsetY: 0 },
            { angle: Math.PI / 4, offsetY: 0 },
            { angle: Math.PI / 2, offsetY: 0 },
            { angle: 3 * Math.PI / 4, offsetY: 0 },
            { angle: Math.PI, offsetY: 0 },
            { angle: 5 * Math.PI / 4, offsetY: 0 },
            { angle: 3 * Math.PI / 2, offsetY: 0 },
            { angle: 7 * Math.PI / 4, offsetY: 0 },
        ];

        legPositions.forEach(({ angle, offsetY }) => {
            const legGeometry = new THREE.CapsuleGeometry(0.1, legLength, 4, 8);
            const legMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1 }); // Blue color
            const leg = new THREE.Mesh(legGeometry, legMaterial);

            leg.position.x = Math.cos(angle) * 0.7;
            leg.position.z = Math.sin(angle) * 0.7;
            leg.position.y = offsetY;
            leg.rotation.z = Math.PI / 2;
            leg.rotation.x = angle;

            crab.add(leg);
        });

        // Add the crab to the scene
        scene.add(crab);

        // Position camera
        camera.position.z = 5;

        // Dotted line for following the cursor
        const cursorDot = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0xffa500 }) // Orange color
        );
        scene.add(cursorDot);

        // Create the dots for the trail
        const numDots = 15;
        const dotSize = 0.05;
        const dots = [];

        for (let i = 0; i < numDots; i++) {
            const dot = new THREE.Mesh(
                new THREE.SphereGeometry(dotSize, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0xffa500 }) // Orange color
            );
            scene.add(dot);
            dots.push(dot);
        }

        // Set up mouse movement tracking
        let mouseX = 0;
        let mouseY = 0;

        // Track cursor position
        const onMouseMove = (event) => {
            // Convert mouse position to normalized device coordinates (-1 to +1)
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', onMouseMove);

        // Handle window resize
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onWindowResize);

        // Animation loop
        const crabPosition = { x: 0, y: 0, z: 0 };
        const targetPosition = { x: 0, y: 0, z: 0 };
        const dotPositions = Array(numDots).fill().map(() => ({ x: 0, y: 0, z: 0 }));

        const animate = () => {
            requestAnimationFrame(animate);

            // Set cursor dot position based on mouse coordinates
            cursorDot.position.x = mouseX * 4;
            cursorDot.position.y = mouseY * 2;

            // Update target position (where the crab should move to)
            targetPosition.x = mouseX * 4;
            targetPosition.y = mouseY * 2;

            // Smooth movement for the crab
            crabPosition.x += (targetPosition.x - crabPosition.x) * 0.05;
            crabPosition.y += (targetPosition.y - crabPosition.y) * 0.05;

            crab.position.x = crabPosition.x;
            crab.position.y = crabPosition.y;

            // Rotate crab to face cursor
            const angle = Math.atan2(
                targetPosition.y - crabPosition.y,
                targetPosition.x - crabPosition.x
            );
            crab.rotation.z = angle + Math.PI / 2;

            // Update dot positions for the trail
            for (let i = dots.length - 1; i > 0; i--) {
                dotPositions[i].x = dotPositions[i - 1].x;
                dotPositions[i].y = dotPositions[i - 1].y;
            }

            // First dot follows the crab
            dotPositions[0].x = crabPosition.x;
            dotPositions[0].y = crabPosition.y;

            // Position each dot
            dots.forEach((dot, index) => {
                // Calculate position with even spacing
                const t = index / (dots.length - 1);
                dot.position.x = crabPosition.x + (cursorDot.position.x - crabPosition.x) * t;
                dot.position.y = crabPosition.y + (cursorDot.position.y - crabPosition.y) * t;
            });

            renderer.render(scene, camera);
        };

        animate();
        setIsInitialized(true);

        // Cleanup function
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onWindowResize);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [isInitialized]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1000
            }}
        />
    );
};

export default CrabCursorFollower;