# Lodash.template

Lodash.template 用于解析模板字符串。注释中提到这个模板解析函数基于 John Resig 的 Micro Templating 和 Laura Doktorava 的 doT.js 项目。关于 Micro Templating，这里已经解释过了：[Micro Templating](/articles/source-code/segment/micro-templating.html)。

## 完整实现

```js
function template(string, options, guard) {
    var settings = lodash.templateSettings

    if (guard && isIterateeCall(string, options, guard)) {
        options = undefined
    }
    string = toString(string)
    options = assignInWith({}, options, settings, customDefaultsAssignIn)

    var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
        importsKeys = keys(imports),
        importsValues = baseValues(imports, importsKeys)

    var isEscaping,
        isEvaluating,
        index = 0,
        interpolate = options.interpolate || reNoMatch,
        source = "__p += '"

    // Compile the regexp to match each delimiter.
    var reDelimiters = RegExp(
        (options.escape || reNoMatch).source +
            '|' +
            interpolate.source +
            '|' +
            (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source +
            '|' +
            (options.evaluate || reNoMatch).source +
            '|$',
        'g'
    )

    // Use a sourceURL for easier debugging.
    // The sourceURL gets injected into the source that's eval-ed, so be careful
    // with lookup (in case of e.g. prototype pollution), and strip newlines if any.
    // A newline wouldn't be a valid sourceURL anyway, and it'd enable code injection.
    var sourceURL =
        '//# sourceURL=' +
        (hasOwnProperty.call(options, 'sourceURL')
            ? (options.sourceURL + '').replace(/[\r\n]/g, ' ')
            : 'lodash.templateSources[' + ++templateCounter + ']') +
        '\n'

    string.replace(reDelimiters, function(
        match,
        escapeValue,
        interpolateValue,
        esTemplateValue,
        evaluateValue,
        offset
    ) {
        interpolateValue || (interpolateValue = esTemplateValue)

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar)

        // Replace delimiters with snippets.
        if (escapeValue) {
            isEscaping = true
            source += "' +\n__e(" + escapeValue + ") +\n'"
        }
        if (evaluateValue) {
            isEvaluating = true
            source += "';\n" + evaluateValue + ";\n__p += '"
        }
        if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'"
        }
        index = offset + match.length

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match
    })

    source += "';\n"

    // If `variable` is not specified wrap a with-statement around the generated
    // code to add the data object to the top of the scope chain.
    // Like with sourceURL, we take care to not check the option's prototype,
    // as this configuration is a code injection vector.
    var variable = hasOwnProperty.call(options, 'variable') && options.variable
    if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n'
    }
    // Cleanup code by stripping empty strings.
    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;')

    // Frame code as the function body.
    source =
        'function(' +
        (variable || 'obj') +
        ') {\n' +
        (variable ? '' : 'obj || (obj = {});\n') +
        "var __t, __p = ''" +
        (isEscaping ? ', __e = _.escape' : '') +
        (isEvaluating
            ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n"
            : ';\n') +
        source +
        'return __p\n}'

    var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues)
    })

    // Provide the compiled function's source by its `toString` method or
    // the `source` property as a convenience for inlining compiled templates.
    result.source = source
    if (isError(result)) {
        throw result
    }
    return result
}
```

## 代码解析

TODO...