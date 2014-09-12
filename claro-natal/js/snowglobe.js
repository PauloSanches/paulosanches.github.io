(function(window, undefined) {
    // 'use strict';

    var Snowglobe = (function() {

        var container, stats,
            camera, scene, projector, renderer, canvasBounds,
            stars = [],
            gifts = [],
            clouds = [],
            objects = [],
            mouseX = 0,
            mouseY = 0,
            motionX = 0,
            motionY = 0,
            motionZ = 0,
            orientation = window.orientation;

        function init() {
            container = $s('#container-landscape');

            // createStats();
            threeSettings();

            createClouds();

            window.onorientationchange = deviceOrientationChange;

            animate();
        }

        function deviceOrientationChange(){
            this.orientation = window.orientation;
        }

        function snow() {
            createStars();
            createGifts();
            registerEvents();
        }

        function createStats() {
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            container.appendChild(stats.domElement);
        }

        function threeSettings() {
            camera = new THREE.PerspectiveCamera(45, 1024 / 768, 1, 20000);
            camera.position.set(0, 0, 927);

            scene = new THREE.Scene();
            projector = new THREE.Projector();

            camera.lookAt(scene.position);

            scene.add(camera);

            renderer = new THREE.CanvasRenderer();
            renderer.setSize(1024, 768);

            container.appendChild(renderer.domElement);
        }

        function registerEvents() {
            // registerTouchEvent();
            registerMotionEvent();
            registerMouseMoveEvent();
            registerShakeEvent();
        }

        function registerMotionEvent() {
            window.addEventListener('devicemotion', deviceMotionEventDidOccur, false);
        }

        function deviceMotionEventDidOccur(e) {
            this.motionX = Math.floor(e.accelerationIncludingGravity.x);
            this.motionY = Math.floor(e.accelerationIncludingGravity.y);
            this.motionZ = Math.floor(e.accelerationIncludingGravity.z);
        }

        function registerMouseMoveEvent() {
            window.addEventListener('mousemove', mouseMoveEventDidOccur, false);
        }

        function mouseMoveEventDidOccur(event) {
            mouseX = event.x - 1024 / 2;
            mouseY = event.y - 768 / 2;
        }

        function registerShakeEvent() {
            window.addEventListener('shake', shakeEventDidOccur, false);
        }

        function shakeEventDidOccur(e) {
            var i = 0,
                l = stars.length;

            for (; i < l; i++) {
                var star = stars[i];
                star.shake();
            }

            i = 0;
            l = gifts.length;

            for(; i < l; i++) {
                var gift = gifts[i];
                gift.shake();
            }

        }

        function registerTouchEvent() {
            renderer.domElement.addEventListener('mousedown', function(event) {
                event.preventDefault();

                var mouse = {};
                mouse.x = (event.clientX / 1024) * 2 - 1;
                mouse.y = -(event.clientY / 768) * 2 + 1;

                var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

                projector.unprojectVector(vector, camera);

                var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

                var intersects = raycaster.intersectObjects(objects);

                if (intersects.length > 0) {
                    window.OgvAd.Main.openFeature(intersects[0].object.name);
                }
            });
        }

        function createClouds() {
            var cloudsData = [{
                x: 320,
                y: -170,
                material: 'img/landscape/cloud.png'
            }, {
                x: -520,
                y: -100,
                material: 'img/landscape/cloud.png'
            }, {
                x: -700,
                y: 250,
                material: 'img/landscape/cloud2.png'
            }, {
                x: 400,
                y: 380,
                material: 'img/landscape/cloud2.png'
            }],
                bounds = {
                    minX: -950,
                    maxX: 950,
                };

            for (var i = 0; i < cloudsData.length; i++) {
                var s = cloudsData[i].material;

                var material = new THREE.ParticleBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(s)
                });

                var cloud = new window.OgvAd.Cloud(material, bounds, cloudsData[i].x, cloudsData[i].y);
                cloud.name = 'cloud_' + i;

                scene.add(cloud);
                clouds.push(cloud);
            }
        }

        function createStars() {
            var materials = ['img/landscape/star.png', 'img/landscape/star2.png', 'img/landscape/star3.png'],
                bounds = {
                    minX: -540,
                    maxX: 540,
                    minY: 1110,
                    maxY: -450,
                    minZ: 0,
                    maxZ: 100
                };

            for (var i = 0; i < 40; i++) {
                var multiplier = Math.floor(Math.random() * (materials.length)),
                    s = materials[multiplier];

                var material = new THREE.ParticleBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(s)
                });

                var star = new window.OgvAd.Star(material, bounds, multiplier);
                star.name = 'star_' + i;

                scene.add(star);
                stars.push(star);
            }
        }

        function createGifts() {
            var materials = ['img/landscape/gift.png', 'img/landscape/gift2.png', 'img/landscape/gift3.png'],
                bounds = {
                    minX: -720,
                    maxX: 720,
                    minY: 480,
                    maxY: -480
                };

            for (var i = 0; i < 8; i++) {
                var indice = Math.floor(Math.random() * (materials.length)),
                    s = materials[indice],
                    material = new THREE.ParticleBasicMaterial({
                        map: THREE.ImageUtils.loadTexture(s)
                    }),
                    gift = new window.OgvAd.Gift(material, i, bounds, indice);

                gift.name = 'gift_' + i;

                scene.add(gift);
                gifts.push(gift);
            }
        }

        function createMoon() {
            var texture = new THREE.ImageUtils.loadTexture('img/landscape/moon.png'),
                moonMaterial = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide
                }),
                moonGeometry = new THREE.PlaneGeometry(92, 115, 1, 1),
                moon = new THREE.Mesh(moonGeometry, moonMaterial);

            moon.position.set(130, 200, 0);


            scene.add(moon);
        }

        function end() {
            var i = 0,
                l = stars.length;

            for(; i < l; i++) {
                stars[i].loop = false;
            }

            i = 0;
            l = gifts.length;

            for(; i < l; i++){
                gifts[i].loop = false;
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
            renderStars();
            renderClouds();
            renderGifts();

        }

        function renderStars() {
            var i = 0,
                l = stars.length,
                eixo = this.orientation === -90 ? this.motionY : -1 * this.motionY;

            for (; i < l; i++) {
                var star = stars[i];

                star.updatePhysics(eixo);
                star.checkBounds();
                star.checkVelocity();
                
                if(!star.loop) {
                    star.checkEndZone();
                }
            }
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

        function renderGifts() {
            var i = 0,
                l = gifts.length,
                eixo = this.orientation === -90 ? this.motionY : -1 * this.motionY;

            for (; i < l; i++) {
                var gift = gifts[i];

                gift.updatePhysics(eixo);
                gift.checkBounds();
                gift.checkAngle();
                gift.checkVelocity();
                
                if(!gift.loop) {
                    gift.checkEndZone();
                }
            }
        }

        return {
            init: init,
            snow: snow,
            shake: shakeEventDidOccur,
            end: end
        };

    }(window.OgvAd));

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Snowglobe = Snowglobe;

}(window, undefined));
