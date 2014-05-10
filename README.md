# organic-globdir

Organelle for emitting every file found within dir recursively.

## dna

    {
      "root": "path/relative/to/cwd",
      "pattern": "/**/*.ext",
      "forEachEmit": {
        "value": ""
      },
      "emitReady": "",
      "reactOn": ""
    }

* `forEachEmit` is Chemical body been send into Plasma with added properties:
  * `data` - `glob-stream`'s File structure
  * `root` - `dna.root` value

* `emitReady` is Chemical type value, when provided will be used to emit into Plasma chemical having
  * `err` - null or Error value

* when `reactOn` is not provided the organelle is triggered with its dna upon building.

## reacts to `dna.reactOn` value

Triggers globdir organelle using provided chemical as dna.