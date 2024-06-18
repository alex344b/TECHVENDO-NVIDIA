window.threeInterop = {
    initialize: async function (canvasId) {
        const canvas = document.getElementById(canvasId);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });


        // black baggrund
        renderer.setClearColor(0xffffff, 0);

        //add scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 1, 1000);
        camera.position.z = 300;

        // Hemisphere light
        const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        scene.add(light);

        //Top light
        const topLight = new THREE.DirectionalLight(0xffffff, 9); // (color, intensity)
        topLight.position.set(500, 500, 500) //top-left-ish
        topLight.castShadow = true;
        scene.add(topLight);


        //add the GLB 3dmodel
        const loader = new THREE.GLTFLoader();
        const file = 'https://alex.magsapi.com/4090.glb'
        loader.load(file, function (gltf) {
            const model = gltf.scene;
            scene.add(model);

            function animate() {
                requestAnimationFrame(animate);

                model.rotation.y += 0.004;
                renderer.render(scene, camera);
            }
            animate();

        }, undefined, function (error) {
            console.error('An error happened', error);
        });
    }
};