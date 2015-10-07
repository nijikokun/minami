exports.defineTags = function(dictionary) {
    dictionary.defineTag('rpc', {
      onTagged: handleRpcTag
    });
};

function handleRpcTag(doclet, tag) {
  doclet.rpc = tag.value || true;
}
