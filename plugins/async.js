exports.defineTags = function(dictionary) {
    dictionary.defineTag('async', {
      onTagged: handleAsyncTag
    });
};

function handleAsyncTag(doclet, tag) {
  doclet.async = true;
}
