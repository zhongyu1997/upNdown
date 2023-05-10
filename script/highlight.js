const originHtml = document.body.getInnerHTML()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('herehere')
    if (request.cmd === 'upNdown') {
        const {configReg, minusConfigReg} = genRegExp(request.value)
        let innerHtml = originHtml.replace(configReg, '<span style="color:green">$&</span>')
        innerHtml = innerHtml.replace(minusConfigReg, '<span style="color:red">$&</span>')
        document.body.innerHTML = innerHtml
    }
    else sendResponse('error')
})

function genRegExp(config) {
    let configReg = ''
    let minusConfigReg = ''
    console.log(config)
    configReg = `(?<=(\\>|\\s))[+]?[0-9.]*[0-9]+(${config.pp ? 'pp|PP' : ''}${config.bp ? '|bp|BP' : ''})`
    minusConfigReg = `(?<=(\\>|\\s))-[0-9.]*[0-9]+(${config.pp ? 'pp|PP' : ''}${config.bp ? '|bp|BP' : ''})`
    configReg = new RegExp(configReg, 'g')
    console.log('<span>0.02PP</span>'.replace(configReg, 'tt'))
    minusConfigReg = new RegExp(minusConfigReg, 'g')
    return {configReg, minusConfigReg}
}