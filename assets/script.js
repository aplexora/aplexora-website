
const header=document.querySelector('.header');
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
const syncHeader=()=>header&&header.classList.toggle('scrolled',window.scrollY>15);
syncHeader();window.addEventListener('scroll',syncHeader,{passive:true});
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.10});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Homepage solution console
const solutionData={
 influence:{title:'Influencer Marketing & Creator Partnerships',text:'Structured brand/creator support from discovery and fit assessment through briefs, rights, approvals, publication evidence and reporting.',pills:['Creator sourcing','Campaign briefs','Rights & approvals','Reporting']},
 language:{title:'Translation & Language Services',text:'Translation, transcription, interpretation coordination, editing, proofreading, bilingual review, terminology management and linguistic QA.',pills:['Translation','Transcription','Proofreading','Linguistic QA']},
 tender:{title:'Proposal & Tender Support',text:'RFQ, RFP, EOI and tender support covering requirement extraction, compliance matrices, methodology, team formatting and final submission QA.',pills:['Compliance matrix','Technical proposal','Methodology','Submission QA']},
 docs:{title:'Corporate & Business Documentation',text:'Professional profiles, policies, SOPs, manuals, codes of conduct, agreements, forms, checklists and document-control systems.',pills:['Company profiles','Policies','SOPs','Agreements']},
 advisory:{title:'Advisory & Compliance Support',text:'Practical process mapping, documentation-gap reviews, internal-control documentation, due-diligence tools and implementation support.',pills:['Process mapping','Gap reviews','Controls','Due diligence']},
 digital:{title:'Digital Marketing & Branding',text:'Digital campaign coordination, brand positioning materials, website/business content, creative briefs and professional communications.',pills:['Web content','Brand messaging','Campaign support','Creative briefs']},
 hr:{title:'HR, Admin & Finance Documentation',text:'Job descriptions, onboarding tools, timesheets, performance forms, quotations, invoice systems, trackers and administrative templates.',pills:['HR templates','Invoices','Trackers','Admin systems']},
 research:{title:'Research & Business Support',text:'Desk research, market and competitor scans, structured data collection, briefing notes, opportunity tracking and business-development support.',pills:['Market scans','Competitor research','Briefing notes','Opportunity tracking']}
};
function selectSolution(key){const d=solutionData[key];if(!d)return;document.querySelectorAll('.solution-btn').forEach(b=>b.classList.toggle('active',b.dataset.solution===key));const box=document.querySelector('#solution-detail');if(box){box.innerHTML=`<h3>${d.title}</h3><p>${d.text}</p><div class="mini-pills">${d.pills.map(p=>`<span class="mini-pill">${p}</span>`).join('')}</div>`}}
document.querySelectorAll('.solution-btn').forEach(b=>b.addEventListener('click',()=>selectSolution(b.dataset.solution)));

// Generic brand/creator tabs
for(const group of document.querySelectorAll('[data-tabs]')){const buttons=group.querySelectorAll('.tab-btn');const panels=group.querySelectorAll('.tab-panel');buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));panels.forEach(p=>p.classList.remove('active'));btn.classList.add('active');group.querySelector(`#${btn.dataset.target}`)?.classList.add('active')}))}

// Services explorer
const serviceButtons=document.querySelectorAll('.service-menu-btn');
function openService(id){serviceButtons.forEach(b=>b.classList.toggle('active',b.dataset.service===id));document.querySelectorAll('.service-panel').forEach(p=>p.classList.toggle('active',p.id===`service-${id}`));const panel=document.getElementById(`service-${id}`);if(panel&&window.innerWidth<1020)panel.scrollIntoView({behavior:'smooth',block:'start'})}
serviceButtons.forEach(b=>b.addEventListener('click',()=>openService(b.dataset.service)));
const hash=(location.hash||'').replace('#','');if(hash&&document.getElementById(`service-${hash}`))openService(hash);

// Project / campaign intent on the clean Contact URL.
const form=document.querySelector('#contact-form');
const intent=(location.hash||'').replace('#','').toLowerCase();
if(form && (intent==='campaign' || intent==='project')){
  const serviceField=form.querySelector('#service');
  const messageField=form.querySelector('#message');
  const requestType=form.querySelector('#request-type');
  const gmailLinks=document.querySelectorAll('.gmail-link');
  const to='partnerships@aplexora.com';
  if(intent==='campaign'){
    if(serviceField) serviceField.value='Influencer marketing / creator partnership';
    if(requestType) requestType.value='Influencer marketing campaign';
    if(messageField) messageField.placeholder='Tell us the campaign objective, target audience / market, preferred platforms, creator profile or niche, expected deliverables, timeline, estimated budget, and any relevant links.';
    const subject='Aplexora Influencer Marketing Campaign Inquiry';
    gmailLinks.forEach(a=>a.href=`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}`);
  }else{
    if(requestType) requestType.value='General project inquiry';
    const subject='Aplexora Business Project Inquiry';
    gmailLinks.forEach(a=>a.href=`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}`);
  }
  setTimeout(()=>form.scrollIntoView({behavior:'smooth',block:'start'}),120);
}
