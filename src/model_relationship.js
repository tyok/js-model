Model.Relationship = (function() {

        // instance func
        var getMany = function(model) {
            var id = this.id();
            var fkey = this.constructor._name + "_id";

            return model.select(function() { return this.attr(fkey) == id }).all();
        };

        // instance func
        var getOwner = function(model) {
            var fkey = model._name + "_id";
            var self = this;

            return model.detect(function() { return this.id() == self.attr(fkey) });
        };

        // class func
        var hasMany = function(model, alias) {
            if (! "_name" in model) return;

            // add func to prototype
            var funcName = alias? alias: model._name;
            this.prototype[funcName] = function() { return getMany.call(this, model) };

            return this;
        };

        // class func
        var belongsTo = function(model, alias) {
            if (! "_name" in model) return;

            // add func to prototype
            var funcName = alias? alias: model._name;
            this.prototype[funcName] = function() { return getOwner.call(this, model) };

            return this;
        };

        // this will be added to model class
        return {
            hasMany: hasMany,
            belongsTo: belongsTo
        };
    })();
