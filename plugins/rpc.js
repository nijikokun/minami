exports.defineTags = function(dictionary) {
    dictionary.defineTag('rpc', {
      //mustHaveValue: true,
      onTagged: handleRpcTag
    });
};

function handleRpcTag(doclet, tag) {
  doclet.rpc = tag.value || true;
}
