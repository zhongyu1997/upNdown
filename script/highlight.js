
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('herehere')
    if (request.cmd === 'upNdown') {
        // 新增代码
        console.log(request)
        const { configReg, minusConfigReg } = genRegExp(request.value)
        const tables = document.getElementsByTagName('tbody')

        for (let table of tables) {
            traverseNodes(table, configReg, minusConfigReg );
        }
    }
    else sendResponse('error')
})

function genRegExp(config) {
    let configReg = ''
    let minusConfigReg = ''
    console.log(config)
    configReg = `[+]?[0-9.]*[0-9]+(${config.pp ? 'pp|PP' : ''}${config.bp ? '|bp|BP' : ''})`
    minusConfigReg = `-[0-9.]*[0-9]+(${config.pp ? 'pp|PP' : ''}${config.bp ? '|bp|BP' : ''})`
    configReg = new RegExp(configReg, 'g')
    console.log('<span>0.02PP</span>'.replace(configReg, 'tt'))
    minusConfigReg = new RegExp(minusConfigReg, 'g')
    return {configReg, minusConfigReg}
}

function traverseNodes(node, unitReg, minusReg) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        const matches = text.match(unitReg);
        const minusMatches = text.match(minusReg);

        const processMatches = (matches, color) => {
            if (matches) {
                for (let j = 0; j < matches.length; j++) {
                    const match = matches[j];
                    const index = text.indexOf(match);
                    const range = document.createRange();
                    range.setStart(node, index);
                    range.setEnd(node, index + match.length);
                    const ancestor = range.commonAncestorContainer;
                    ancestor.parentNode.style.color = color
                }
            }
        };

        if(minusMatches) {
            processMatches(minusMatches, 'red');
        } else {
            processMatches(matches, 'green');
        }
    } else {
        for (let i = 0; i < node.childNodes.length; i++) {
            traverseNodes(node.childNodes[i], unitReg, minusReg);
        }
    }
}