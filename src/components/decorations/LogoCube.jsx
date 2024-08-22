import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LogoCube = () => {
  const ref = useRef(null);

  useEffect(() => {
    let touchX = 0;
    let touchY = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio set to 1
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const cubeSize = 150; // Set size for the cube
    renderer.setSize(cubeSize, cubeSize);
    
    if (ref.current) {
      ref.current.appendChild(renderer.domElement);
    }

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0xffff00 }),
      new THREE.MeshBasicMaterial({ color: 0xff00ff }),
      new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    ];

    const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), materials); // Larger cube
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += (touchY - cube.rotation.x) * 0.05;
      cube.rotation.y += (touchX - cube.rotation.y) * 0.05;
      renderer.render(scene, camera);
    };

    const onTouchMove = (event) => {
      if (event.touches.length === 1) {
        touchX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        touchY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    animate();

    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('touchmove', onTouchMove);

      if (ref.current) {
        ref.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} style={{ margin: '0 auto' }} />;
};

export default LogoCube;
