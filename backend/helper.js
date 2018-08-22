module.exports = {
    clean: function(language, str) {
        switch(language) {
            case 'scheme':
                return str.replace(/GNU Guile[\s\S]*help' for help.\n/,'')
            case 'haskell':
                return str
            case 'prolog':
                return str;
            case 'smalltalk':
                return str
        }
    }
}