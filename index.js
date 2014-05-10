var Organel = require("organic").Organel
var _ = require("underscore")
var glob = require("glob-stream")

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
    glob.create(options.root+options.pattern)
      .on("data", function(file){
        if(options.forEachEmit)
          self.emit(_.extend({
            data: file,
            root: options.root
          }, options.forEachEmit))
      })
      .on("error", function(err){
        if(options.emitReady)
          self.emit({type: options.emitReady, err: err})
        if(next)
          next(err)
      })
      .on("end", function(){
        if(options.emitReady)
          self.emit({type: options.emitReady, err: null})
        if(next)
          next()
      })
  }
})