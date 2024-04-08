// ==UserScript==
// @name         DotPlotEmojie
// @namespace    http://tampermonkey.net/
// @version      2024-04-04
// @description  Replace data points for dot plots in nzGrapher with emojis
// @author       Meepso
// @match        https://grapher.nz/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grapher.nz
// @grant        none
// ==/UserScript==

let plotfunc = plotdotplot.toString()
window.plotfuncINT = plotfunc;

window.drawEmoji = (x, y, ctx, size) => {
  // Array of emojis
  const emojis = ["😊", "😂", "😍", "🥳", "😎", "🎉", "🤔", "👍", "❤️", "🌟"];

  // Randomly select an emoji
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const randomEmoji = emojis[randomIndex];

  // Draw emoji
  ctx.font = size * 1.5 + "px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(randomEmoji, x, y);

}

plotfunc = plotfunc.replace("ctx.arc(rawxpixel,ypixel,rad,0,2*Math.PI);", "window.drawEmoji(rawxpixel, ypixel, DPHI[0], rad);")
console.log("<INJECT> Patched draw function in dotplot!")

plotdotplot = function (ctx,indexes,values,minxtick,maxxtick,oypixel,left,right,maxheight,colors,sort,hovers)
{

    window.dotplothookInfo = [ctx,indexes,values,minxtick,maxxtick,oypixel,left,right,maxheight,colors,sort,hovers]

    eval(`

        const DPHI = window.dotplothookInfo

        ${plotfunc}
        plotdotplot(DPHI[0], DPHI[1], DPHI[2], DPHI[3], DPHI[4], DPHI[5], DPHI[6], DPHI[7], DPHI[8], DPHI[9], DPHI[10], DPHI[11])

    `)

    console.log("Injected into function!")

}
