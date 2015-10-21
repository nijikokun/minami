exports.defineTags = function(dictionary) {
  dictionary.defineTag('api', {
    onTagged: handleRouteTag
  });
  dictionary.defineTag('route', {
    onTagged: handleRouteTag
  });
  dictionary.defineTag('apiparam', {
    onTagged: handleRouteParamTag,
    canHaveType: true,
    canHaveName: true
  });
  dictionary.defineTag('apiquery', {
    onTagged: handleQueryParamTag,
    canHaveType: true,
    canHaveName: true
  });
  dictionary.defineTag('apibody', {
    onTagged: handleBodyTag,
    canHaveType: true
  });
  dictionary.defineTag('apiresponse', {
    onTagged: handleResponseTag,
    canHaveType: true
  });
};

function handleRouteTag(doclet, tag) {
  if (tag.value) doclet.route = tag.value;
}

function handleRouteParamTag(doclet, tag) {
  if (!tag.value) return;
  doclet.routeParams = doclet.routeParams || [];
  doclet.routeParams.push(tag);
}

function handleQueryParamTag(doclet, tag) {
  if (!tag.value) return;
  doclet.queryParams = doclet.queryParams || [];
  doclet.queryParams.push(tag);
}

function handleBodyTag(doclet, tag) {
  if (!tag.value) return;

  doclet.body = tag.value;
}

function handleResponseTag(doclet, tag) {
  if (!tag.value) return;

  doclet.response = tag.value;
}
