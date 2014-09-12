    (function(window, undefined) {
    'use strict';

    var Portrait = (function() {

        var container, stats,
            camera, scene, projector, renderer, canvasBounds,
            clouds = [];

        function init () {
            container = $s('#container-portrait');

            // createStats();
            threeSettings();

            createClouds();

            animate();
        }

        function createStats() {
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            container.appendChild(stats.domElement);
        }

        function threeSettings() {
            camera = new THREE.PerspectiveCamera(45, 768 / 1024, 1, 20000);
            camera.position.set(0, 0, 927);

            scene = new THREE.Scene();
            projector = new THREE.Projector();

            camera.lookAt(scene.position);

            scene.add(camera);

            renderer = new THREE.CanvasRenderer();
            renderer.setSize(768, 1024);

            container.appendChild(renderer.domElement);
        }

        function createClouds() {
            var cloudsData = [
                    {x:150,y:-120, material: 'img/landscape/cloud.png'},
                    {x:-550,y:50, material: 'img/landscape/cloud.png'},
                    {x:250,y:445, material: 'img/landscape/cloud2.png'},
                    {x:-200,y:-395, material: 'img/landscape/cloud2.png'}
                ],
                bounds = {
                    minX: -950,
                    maxX: 450,
                };

            for (var i = 0; i < cloudsData.length; i++) {
                var s = cloudsData[i].material;

                var material = new THREE.ParticleBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(s)
                });

                var cloud = new window.OgvAd.Cloud(material, bounds, cloudsData[i].x, cloudsData[i].y, -700, -900);
                cloud.name = 'cloud_' + i;

                scene.add(cloud);
                clouds.push(cloud);
            }
        }

        function animate() {
            requestAnimationFrame(animate);

            render();

            if(stats) {
                stats.update();
            }
        }

        function render() {

            renderer.render(scene, camera);
            renderClouds();

        }

        function renderClouds() {
            var i = 0,
                l = clouds.length;

            for (; i < l; i++) {
                var cloud = clouds[i];

                cloud.updatePhysics();
                cloud.checkBounds();
            }
        }

        return {
            init: init
        };

    }(window.OgvAd));

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Portrait = Portrait;

}(window, undefined));
