exports.defineTags = function(dictionary) {
  dictionary.defineTag('api', {
    onTagged: handleRouteTag
  });
  dictionary.defineTag('route', {
    onTagged: handleRouteTag
  });
  dictionary.defineTag('apiparam', {
    onTagged: handleRouteParamTag
  });
  dictionary.defineTag('apiquery', {
    onTagged: handleQueryParamTag
  });
  dictionary.defineTag('apibody', {
    onTagged: handleBodyTag
  });
};

function handleRouteTag(doclet, tag) {
  if (tag.value) doclet.route = tag.value;
}

function handleRouteParamTag(doclet, tag) {
  if (tag.value) doclet.routeParam = tag.value;
}

function handleQueryParamTag(doclet, tag) {
  if (tag.value) doclet.queryParam = tag.value;
}

function handleBodyTag(doclet, tag) {
  if (tag.value) doclet.bodyParam = tag.value;
}
