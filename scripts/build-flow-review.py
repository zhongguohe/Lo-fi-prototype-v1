"""Build a read-only Chinese review document from the Mermaid/Markdown baseline.

No product code or prototype data is changed. Mermaid loads from a public CDN;
the Markdown remains the portable, GitHub-renderable source of truth.
"""
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'docs/lo-fi-v2/user-flow-baseline-zh.md'
TARGET = ROOT / 'docs/lo-fi-v2/user-flow-review-zh.html'

def inline(s):
    return re.sub(r'`([^`]+)`', r'<code>\1</code>', html.escape(s))

def render(md):
    lines = md.splitlines(); out=[]; i=0
    while i < len(lines):
        line=lines[i]
        if line.startswith('```'):
            lang=line[3:]; block=[];i+=1
            while i < len(lines) and not lines[i].startswith('```'):
                block.append(lines[i]);i+=1
            raw=html.escape('\n'.join(block))
            if lang=='mermaid':
                out.append('<div class="diagram-toolbar"><button data-zoom="-1">缩小</button><button data-zoom="0">适合宽度</button><button data-zoom="1">放大</button><button data-source>图源</button></div><div class="diagram"><pre class="mermaid">'+raw+'</pre></div><pre class="source" hidden>'+raw+'</pre>')
            else:out.append('<pre>'+raw+'</pre>')
        elif line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].startswith('|'):
                row=[x.strip() for x in lines[i].strip('|').split('|')]
                if not all(re.fullmatch(r'[:\- ]+',x) for x in row):rows.append(row)
                i+=1
            out.append('<div class="table-wrap"><table><thead><tr>'+''.join('<th>'+inline(x)+'</th>' for x in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+inline(x)+'</td>' for x in row)+'</tr>' for row in rows[1:])+'</tbody></table></div>');continue
        elif line.startswith('### '):out.append('<h3>'+inline(line[4:])+'</h3>')
        elif line.startswith('- '):out.append('<p class="bullet">• '+inline(line[2:])+'</p>')
        elif line.strip():out.append('<p>'+inline(line)+'</p>')
        i+=1
    return '\n'.join(out)

sections=[]
current=SOURCE.with_name('flow-changes-v2-zh.md')
for document, prefix in ([(current, 'v2section')] if current.exists() else [])+[(SOURCE,'section')]:
    parts=re.split(r'^## (.+)$',document.read_text(encoding='utf-8'),flags=re.M)
    for i in range(1,len(parts),2):
        title=parts[i]; ident=re.match(r'F\d\d',title)
        sid=ident.group() if ident else prefix+str(i)
        display_title=('V2｜' if prefix=='v2section' else 'V1参考｜')+title
        sections.append((sid,display_title,render(parts[i+1])))
nav=''.join('<a href="#'+sid+'">'+html.escape(title)+'</a>' for sid,title,_ in sections)
nav+='<a href="agent-review-notes-en.md">English agent review notes</a>'
body=''.join('<section id="'+sid+'"><h2>'+html.escape(title)+'</h2>'+content+'</section>' for sid,title,content in sections)
template=r'''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SI684 协作说明与用户流程</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f4f5f7;color:#202833;font:16px/1.65 system-ui,"Microsoft YaHei",sans-serif}header{background:#152b39;color:#fff;padding:28px 34px}h1{font-size:26px;margin:0 0 8px}header p{margin:0;color:#d6e1e8}.layout{display:grid;grid-template-columns:275px minmax(0,1fr);max-width:1800px;margin:auto}nav{position:sticky;top:0;height:100vh;overflow:auto;padding:22px 14px;border-right:1px solid #d7dce2}nav a{display:block;color:#294c60;text-decoration:none;padding:9px 12px;font-size:14px;border-radius:5px}nav a:hover,nav a.active{background:#dce8ee}main{min-width:0;padding:26px 36px 100px}section{scroll-margin-top:22px;margin-bottom:44px;background:#fff;padding:24px 28px;border:1px solid #dce1e6;border-radius:8px}h2{font-size:21px;margin:0 0 16px}h3{font-size:18px}p{margin:12px 0}code{background:#edf2f5;padding:1px 4px;overflow-wrap:anywhere}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.6 ui-monospace,monospace;background:#f4f6f8;padding:16px}.diagram{overflow:auto;max-height:82vh;padding:18px 0;min-height:100px}.diagram svg{max-width:none!important;height:auto;display:block;margin:0 auto}.diagram-toolbar{display:flex;gap:8px;flex-wrap:wrap}button{font:inherit;font-size:13px;padding:6px 12px;background:#fff;border:1px solid #b7c6d0;border-radius:4px;cursor:pointer}button:hover{background:#e9f0f4}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;font-size:14px}th,td{padding:10px 12px;text-align:left;border-bottom:1px solid #dce1e6;vertical-align:top}th{background:#eef3f6;white-space:nowrap}.note{font-size:13px;color:#536473}#render-status{display:inline-block;margin-top:12px;font-size:13px}nav .section-title{font-size:12px;letter-spacing:.08em;color:#677d89;padding:12px}a{color:#235c7d}.bullet{padding-left:12px}@media(max-width:850px){.layout{grid-template-columns:1fr}nav{position:relative;height:auto;max-height:240px;border-bottom:1px solid #ccd6dd}main{padding:15px}section{padding:18px 16px}header{padding:22px}}@media print{nav,.diagram-toolbar,#render-status{display:none}.layout{display:block}header{background:white;color:black}header p{color:black}main{padding:0}section{break-before:page;border:0;padding:0}.diagram{max-height:none;overflow:visible}.diagram svg{max-width:100%!important}table{font-size:10px}}
</style></head><body><header><h1>SI684｜V2变更与用户流程对照</h1><p>先查看已实现的V2变化，再参考完整V1流程 · 2026-11-20</p><div id="render-status">正在加载流程图</div></header><div class="layout"><nav aria-label="流程目录"><div class="section-title">文档目录</div>__NAV__<a href="user-flow-baseline-zh.md">V1文字版基线</a></nav><main>__BODY__</main></div>
<script src="https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.min.js"></script>
<script>
(async()=>{const status=document.getElementById('render-status');try{mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'base',themeVariables:{fontFamily:'system-ui,Microsoft YaHei,sans-serif',fontSize:'16px',primaryColor:'#edf3f7',primaryTextColor:'#202833',primaryBorderColor:'#8197a7',lineColor:'#60798b',secondaryColor:'#fcf0d6',tertiaryColor:'#edf5ef'},flowchart:{useMaxWidth:false,htmlLabels:false,curve:'linear',nodeSpacing:32,rankSpacing:46}});for(const pre of document.querySelectorAll('.mermaid')){const id='chart'+Math.random().toString(36).slice(2);let raw=pre.textContent;const problems=[...raw.matchAll(/^\s*(f\d\d[a-z]+)\[.*(?:问题A\d\d|A03)/gm)].map(x=>x[1]);if(problems.length)raw+='\nclassDef issue fill:#fff0e8,stroke:#b75c35\nclass '+problems.join(',')+' issue';const result=await mermaid.render(id,raw);pre.parentElement.innerHTML=result.svg;const svg=document.getElementById(id);const natural=Number(svg.getAttribute('viewBox').split(/\s+/)[2]);svg.dataset.natural=natural;svg.style.width=Math.min(natural,svg.parentElement.clientWidth)+'px';}status.textContent='全部 '+document.querySelectorAll('.diagram svg').length+' 张流程图已加载；图可缩放，目录可跳转'}catch(error){status.textContent='图表加载失败，可查看图源或Markdown；'+error.message;console.error(error)}})();
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{const svg=button.parentElement.nextElementSibling.querySelector('svg');if(!svg)return;const direction=Number(button.dataset.zoom);const width=direction===0?Math.min(Number(svg.dataset.natural),svg.parentElement.clientWidth):parseFloat(svg.style.width)*(direction>0?1.25:.8);svg.style.width=Math.max(300,Math.min(6000,width))+'px'}));document.querySelectorAll('[data-source]').forEach(button=>button.addEventListener('click',()=>{const source=button.parentElement.nextElementSibling.nextElementSibling;source.hidden=!source.hidden}));const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))}},{rootMargin:'0px 0px -65% 0px'});document.querySelectorAll('main section').forEach(s=>observer.observe(s));
</script></body></html>'''
TARGET.write_text(template.replace('__NAV__',nav).replace('__BODY__',body),encoding='utf-8')
print(f'Built {TARGET} ({len(sections)} sections)')
