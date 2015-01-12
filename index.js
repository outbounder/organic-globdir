var Organel = require("organic").Organel
var _ = require("underscore")
var glob = require("glob-stream")
var async = require("async")

module.exports = Organel.extend(function(plasma, dna){
  Organel.call(this, plasma, dna)
  if(this.reactOn)
    this.on(this.reactOn, this.reaction)
  else
    this.reaction(dna)
}, {
  reaction: function(options, next) {
    var self = this
    var firstFoundError = null;
    var buffer = []

    glob.create(options.root+options.pattern)
      .on("data", function(file){
        if(options.forEachEmit)
          buffer.push(_.extend({
            data: file,
            root: options.root,
            emitReady: "organic-globdir/"+file.path
          }, options.forEachEmit))
      })
      .on("error", function(err){
        if(options.emitReady)
          self.plasma.emit({type: options.emitReady, err: err})
        if(next)
          next(err)
      })
      .on("end", function(){
        async.eachLimit(buffer, options.eachLimit || 1, function(chemical, nextChemical){
          self.plasma.once(chemical.emitReady, function(c){
            nextChemical(c.err)
          })
          self.plasma.emit(chemical)
        }, function(err){
          if(options.emitReady)
            self.plasma.emit({type: options.emitReady, err: err})
          if(next)
            next(err)
        })
      })
  }
})