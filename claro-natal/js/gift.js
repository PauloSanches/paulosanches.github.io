(function(window, undefined) {

    var Gift = function(material, multiplier, canvasBounds, indice) {

        THREE.Particle.call(this, material);

        this.directions = ['right', 'left'];
        this.canvasBounds = canvasBounds;
        this.indice = indice;
        this.velocity = this.velocityFactory();
        this.rotationAngle = {
            max: 0.01,
            min: -0.01,
            angle: $u.randomRange(0.001, 0.0015),
            direction: indice >= this.directions.length ? 0 : this.directions[indice]
        };

        this.setPosition();

        this.lastAngle = this.rotationAngle.angle;
        this.freezed = true;
        this.loop = true;

        this.lastVX = this.velocity.x;
        this.lastVY = this.velocity.y;
    };

    Gift.prototype = new THREE.Particle();
    Gift.prototype.constructor = Gift;

    Gift.prototype.updatePhysics = function(eixo) {
        if (this.freezed) {
            return;
        }

        var e = this.loop ? eixo / 1000 : 0;

        // if(eixo) this.velocity.x += (-1 * this.rotationAngle.angle) + (e * 5);
        // this.velocity.x += (-1 * this.rotationAngle.angle);
        // this.rotation += this.rotationAngle.angle;

        if(eixo){
          this.velocity.x = eixo;
        } 
        
        if(eixo) {
            this.rotation += e;
        }
        
        this.position.add(this.velocity);
    };

    Gift.prototype.checkBounds = function() {
        if (this.position.y < this.canvasBounds.maxY || this.position.x < this.canvasBounds.minX || this.position.x > this.canvasBounds.maxX) {
            this.setPosition();
            this.velocity = this.velocityFactory();
        }    
    };

    Gift.prototype.checkAngle = function() {
        if (this.rotationAngle.direction === 'left') {
            this.rotationAngle.angle += 0.00001;
        } else if(this.rotationAngle.direction === 'right') {
            this.rotationAngle.angle -= 0.00001;
        }

        if (this.rotation > this.rotationAngle.max) {
            // this.rotation = this.rotationAngle.max;
            this.rotationAngle.direction = 'right';
        } else if (this.rotation < this.rotationAngle.min) {
            // this.rotation = this.rotationAngle.min;
            this.rotationAngle.direction = 'left';
        }
    };

    Gift.prototype.setPosition = function() {
        this.position.x = Math.floor($u.randomRange(-590, 590));
        this.position.y = Math.floor($u.randomRange(500, 1600));
        this.position.z = this.indice;

        this.rotationAngle.angle = 0;
        this.rotation = 0;
        this.rotationAngle.direction = this.directions[Math.floor(Math.random() * this.directions.length)];
    };

    Gift.prototype.onStage = function() {
        var _in = true,
            r = $u.randomRange(-220, -260);

        if (this.position.x <= this.canvasBounds.minX || this.position.x >= this.canvasBounds.maxX || this.position.y >= 500 || this.position.y <= r) {
            _in = false;
        }
        
        return _in;
    };

    Gift.prototype.velocityFactory = function() {
        var x = 0,
            y = -0.6,
            // y = -5,
            z = 0;

        return new THREE.Vector3(x, y, z);
    };

    Gift.prototype.setVelocity = function() {
        this.velocity = new THREE.Vector3(this.lastVX, this.lastVY, 0);
    };

    Gift.prototype.shake = function() {
        var that = this;

        if(this.freezed){
            this.freezed = false;
            this.velocity.y += -1 * (this.velocity.y - 0.4);
            this.rotationAngle.direction = this.indice === 0 ? this.directions[1] : this.directions[0];

            setTimeout(function() {
                that.slowdown = true;
            }, 1000);
        }else{
            if (this.onStage()) {
                this.velocity.y += -1 * (this.velocity.y - 0.5);
                this.rotationAngle.direction = this.indice === 0 ? this.directions[1] : this.directions[0];

                setTimeout(function() {
                    that.slowdown = true;
                }, 1000);
            } else {
                this.freeze();
            }
        }
    };

    Gift.prototype.freeze = function() {
        this.freezed = true;
        var that = this;
        setTimeout(function() {
            that.freezed = false;
        }, 5000);
    };

    Gift.prototype.checkVelocity = function() {
        if (this.slowdown === true) {
            if (this.velocity.y >= this.lastVY && (this.velocity.y - 0.01) !== Number.NEGATIVE_INFINITY && !isNaN(this.velocity.y)) {
                this.velocity.y -= 0.01;
            } else {
                this.slowdown = false;
            }
        }
    };

    Gift.prototype.checkEndZone = function() {
        this.shake = function() {};
        this.freeze = function() {};

        if (!this.onStage()) {
            this.updatePhysics = function() {};
            this.checkBounds = function() {};
            this.checkVelocity = function() {};
            this.checkAngle = function() {};
            this.checkEndZone = function() {};
        }
    };

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Gift = Gift;


}(window, undefined));
