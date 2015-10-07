exports.defineTags = function(dictionary) {
    dictionary.defineTag('timeout', {
      mustHaveValue: true,
      onTagged: handleTimeout
    });
};

function handleTimeout(doclet, tag) {
  doclet.timeout = tag.value;
}
