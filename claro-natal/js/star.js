(function(window, undefined) {

    var Star = function(material, canvasBounds, multiplier) {

        THREE.Particle.call(this, material);
        this.multiplier = multiplier;
        this.canvasBounds = canvasBounds;
        this.velocity = this.velocityFactory();
        this.position.x = Math.floor($u.randomRange(-540, 540));
        this.position.y = Math.floor($u.randomRange(-300, -350));
        this.rotation = Math.floor($u.randomRange(-180, 180));
        this.slowdown = false;
        this.lastVX = this.velocity.x;
        this.lastVY = this.velocity.y;
        this.loop = true;
        this.freezed = true;
        this.acceleration = 0.04;
    };

    Star.prototype = new THREE.Particle();
    Star.prototype.constructor = Star;

    Star.prototype.updatePhysics = function(eixo) {
        if (this.freezed) {
            return;
        }

        this.rotation += 0.008;

        if(eixo && this.loop) {
            this.velocity.x = Math.floor(eixo);
        }

        this.position.add(this.velocity);
    };

    Star.prototype.checkBounds = function(bounds) {
        
        if (this.position.x < this.canvasBounds.minX || this.position.x > this.canvasBounds.maxX || this.position.y > this.canvasBounds.minY || this.position.y < this.canvasBounds.maxY) {
            this.setPosition();
            this.setVelocity();
        }
    };

    Star.prototype.onStage = function() {
        var _in = true,
            r = Math.floor($u.randomRange(-290, -360));

        if (this.position.x <= this.canvasBounds.minX || this.position.x >= this.canvasBounds.maxX || this.position.y >= 440 || this.position.y <= r) {
            _in = false;
        }
        return _in;
    };

    Star.prototype.setPosition = function() {
        this.position.x = Math.floor($u.randomRange(-540, 540));
        this.position.y = Math.floor($u.randomRange(450, 1000));
        this.rotation = Math.floor($u.randomRange(-180, 180));
    };

    Star.prototype.velocityFactory = function() {
        var x = 0,
            y = Math.floor($u.randomRange(-0.01, -0.2) - (this.multiplier)),
            z = Math.floor($u.randomRange(0, 10));

        return new THREE.Vector3(x, y, 0);
    };

    Star.prototype.setVelocity = function() {
        this.velocity = new THREE.Vector3(this.lastVX, this.lastVY, 0);
    };

    Star.prototype.shake = function() {
        var that = this;

        if(this.freezed){
            this.freezed = false;

            this.velocity.x += Math.floor($u.randomRange(-1, 1));
            this.velocity.y += Math.floor(-1 * (this.velocity.y - $u.randomRange(2,5)));
            
            setTimeout(function() {
                that.slowdown = true;
            }, 1000);
        }else{
            if (this.onStage()) {
                this.velocity.x += Math.floor($u.randomRange(-2, 2));
                this.velocity.y += Math.floor(-1 * (this.velocity.y - 2));
                
                setTimeout(function() {
                    that.slowdown = true;
                }, 1000);
            } else {
                this.freeze();
            }
        }

    };

    Star.prototype.freeze = function() {
        this.freezed = true;
        var that = this;
        setTimeout(function() {
            that.freezed = false;
        }, 5000);
    };

    Star.prototype.checkVelocity = function() {

        if (this.slowdown === true) {
            if (this.velocity.y >= this.lastVY && (this.velocity.y - 0.1) !== Number.NEGATIVE_INFINITY && !isNaN(this.velocity.y)) {
                this.velocity.y -= 0.1;
            } else {
                this.slowdown = false;
            }
        }
    };

    Star.prototype.checkEndZone = function() {
        this.shake = function() {};
        this.freeze = function() {};

        if (!this.onStage()) {
            this.updatePhysics = function() {};
            this.checkBounds = function() {};
            this.checkVelocity = function() {};
            this.checkEndZone = function() {};
        }
    };

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Star = Star;


}(window, undefined));
