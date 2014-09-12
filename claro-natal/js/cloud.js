(function(window, undefined) {

    var Cloud = function(material, canvasBounds, x, y, minX, maxX) {

        THREE.Particle.call(this, material);

        this.minX = minX;
        this.maxX = maxX;
        this.canvasBounds = canvasBounds;
        this.gravity = new THREE.Vector3(0, 0, 0);
        this.velocity = this.velocityFactory();
        this.position.x = x;
        this.position.y = y;
    };

    Cloud.prototype = new THREE.Particle();
    Cloud.prototype.constructor = Cloud;

    Cloud.prototype.updatePhysics = function() {
        this.velocity.add(this.gravity);
        this.position.add(this.velocity);
    };

    Cloud.prototype.checkBounds = function(bounds) {
        if (this.position.x < this.canvasBounds.minX || this.position.x > this.canvasBounds.maxX) {
            this.setPosition();
        }
    };

    Cloud.prototype.setPosition = function() {
        this.position.x = Math.floor($u.randomRange(this.minX ? this.minX : -960, this.maxX ? this.maxX : -890));
    };

    Cloud.prototype.velocityFactory = function() {
        var x = 0.2,
            y = 0,
            z = 0;

        return new THREE.Vector3(x, y, z);
    };

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Cloud = Cloud;


}(window, undefined));
