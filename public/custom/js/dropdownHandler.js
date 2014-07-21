var DropdownHandler = function(d, wordList, onChange){
	this.dropdown = d;
	var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substrRegex;
            matches = [];
            substrRegex = new RegExp(q, 'i');
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push({
                        value: str
                    });
                }
            });
            cb(matches);
        };
    };

    this.dropdown.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: '',
        displayKey: '',
        source: substringMatcher(wordList)
    });

    this.dropdown.on('typeahead:selected', function() {
        onChange();
    })

    this.dropdown.typing({
        stop: function(event, $elem) {
            onChange();
        },
        delay: 400
    });
}