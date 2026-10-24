// Dependency-free source for the SVG mockups. Run: node design/generate.cjs
const fs = require('node:fs');
const path = require('node:path');
const tokens = require('./tokens.json');
const C = tokens.colors;
const out = path.join(__dirname, 'screens');
fs.mkdirSync(out, {recursive:true});
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const rect = (x,y,w,h,fill=C.surface,r=16,stroke='none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const text = (x,y,s,size=15,fill=C.text,weight=400) => `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}">${esc(s)}</text>`;
const line = (x,y,x2,y2,color=C.border) => `<path d="M${x} ${y}H${x2}" stroke="${color}"/>`;
const card = (x,y,w,h) => rect(x,y,w,h,C.surface,16,C.border);
const pill = (x,y,s,fill=C.primarySoft,color=C.primary,w) => rect(x,y,w||s.length*7+24,28,fill,14)+text(x+12,y+19,s,12,color,600);
const button = (x,y,w,s,primary=true) => rect(x,y,w,42,primary?C.primary:C.surface,10,primary?'none':C.border)+text(x+w/2,y+26,s,14,primary?'#FFFFFF':C.text,600).replace('<text ','<text text-anchor="middle" ');
const avatar = (x,y,initials,fill=C.primarySoft) => rect(x,y,40,40,fill,20)+text(x+20,y+26,initials,13,C.primary,700).replace('<text ','<text text-anchor="middle" ');
const icon = (x,y,type,color=C.muted) => {
 const paths = {
  grid:'M3 3h6v6H3z M15 3h6v6h-6z M3 15h6v6H3z M15 15h6v6h-6z',
  book:'M4 4h7v16H4z M13 4h7v16h-7z',
  people:'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 21v-3a7 7 0 0 1 14 0v3 M18 5a4 4 0 0 1 0 7 M20 15a5 5 0 0 1 3 4v2',
  file:'M6 2h8l5 5v15H6z M14 2v6h5 M9 12h7 M9 16h7',
  search:'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16 M16 16l6 6',
  bell:'M5 17h14l-2-4V8a5 5 0 0 0-10 0v5z M10 21h4',
  arrow:'M4 12h16 M14 6l6 6-6 6',
  check:'M4 12l5 5L20 5',
  sliders:'M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6'
 };
 return `<g transform="translate(${x} ${y})" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[type]||paths.grid}"/></g>`;
};
function shell(active,role='Student') {
 const nav = role==='Student'? [['Overview','grid'],['Explore topics','book'],['My team','people'],['Applications','file']]:role==='Supervisor'?[['Overview','grid'],['My topics','book'],['Applications','file'],['My teams','people']]:[['Overview','grid'],['Supervisors','people'],['Topic allocation','book'],['Reports','file']];
 let s=rect(0,0,1440,1000,C.background,0)+rect(0,0,240,1000,C.sidebar,0);
 s+=rect(28,30,36,36,'#A8DDC8',10)+text(37,55,'T',25,C.sidebar,700)+text(76,55,'ThesisFlow',22,'#FFFFFF',700);
 s+=text(28,100,'ASTANA IT UNIVERSITY',10,'#A0BABB',600);
 s+=text(28,157,role.toUpperCase()+' WORKSPACE',10,'#A0BABB',600);
 nav.forEach(([label,i],n)=>{
  const y=180+n*56; const on=label===active;
  if(on)s+=rect(16,y,208,46,'#29464A',10)+rect(16,y+12,3,22,'#A8DDC8',1);
  s+=icon(31,y+11,i,on?'#B8E9D5':'#A0BABB')+text(68,y+29,label,14,on?'#FFFFFF':'#BCCCD0',on?600:400);
 });
 s+=rect(20,756,200,122,'#203D41',12)+text(36,786,'Your next chapter',14,'#FFFFFF',600)+text(36,810,'A topic. A team. A start.',12,'#BDD1CF')+text(36,851,'Capstone 2025–2026',12,'#A8DDC8');
 s+=line(24,908,216,908,'#355055');
 s+=avatar(24,930,role==='Student'?'NZ':role==='Supervisor'?'NN':'AK')+text(76,947,role==='Student'?'Nurdan Z.':role==='Supervisor'?'Nurtas Nadirov':'Aida K.',13,'#FFFFFF',600)+text(76,967,role==='Student'?'SE-2402 · Student':role,11,'#A0BABB');
 s+=rect(240,0,1200,88,C.surface,0)+line(240,88,1440,88)+text(280,49,'Workspace',13,C.muted)+text(362,49,'/  '+active,13,C.text,500);
 s+=pill(1070,28,'AY 2025–2026','#F1F4F6',C.muted,126)+icon(1230,31,'bell')+avatar(1282,24,role==='Student'?'NZ':role==='Supervisor'?'NN':'AK')+text(1334,49,role,12,C.muted);
 return s;
}
const title = (eyebrow,heading,sub) => text(280,126,eyebrow.toUpperCase(),11,C.primary,700)+text(280,171,heading,32,C.text,700)+text(280,202,sub,15,C.muted);
const stat = (x,label,value,sub) => card(x,238,264,116)+text(x+22,266,label,13,C.muted)+text(x+22,310,value,30,C.text,700)+text(x+22,335,sub,12,C.muted);
function topicCard(x,y,titleText,desc,tags,score,supervisor,slots,w=542) {
 let s=card(x,y,w,216)+pill(x+20,y+18,`${score}% match`)+text(x+20,y+78,titleText,20,C.text,700)+text(x+20,y+104,desc,13,C.muted);
 let tx=x+20; tags.forEach(t=>{s+=pill(tx,y+124,t,'#F1F4F6',C.muted);tx+=t.length*7+33;});
 s+=line(x+20,y+166,x+w-20,y+166)+text(x+20,y+194,supervisor+' · '+slots,12,C.muted)+text(x+w-112,y+194,'View topic →',13,C.primary,600);
 return s;
}
function dashboard(){
 let s=shell('Overview')+title('Student overview','Good morning, Nurdan.','Find a project you care about, with people who complement your skills.');
 s+=stat(280,'Profile readiness','80%','Add your research interests')+stat(560,'Recommended topics','12','Based on your current profile')+stat(840,'Your team','2 / 3','Looking for a frontend developer')+stat(1120,'Applications','0','Choose a topic to get started');
 s+=rect(280,378,1104,126,'#E7F3EF',16)+pill(304,395,'NEXT STEP','#D0E9DF',C.primary,94)+text(304,456,'Complete your team before applying',22,C.text,700)+text(304,482,'One more teammate can help you cover the skills your project needs.',14,C.muted)+button(1174,422,186,'Find teammates');
 s+=text(280,550,'Recommended for you',22,C.text,700)+text(1210,550,'Explore all topics →',13,C.primary,600);
 s+=topicCard(280,574,'Campus Services Platform','Build a single place for everyday campus requests.',['React','FastAPI','PostgreSQL'],94,'N. Nadirov','2 team slots');
 s+=topicCard(842,574,'Student Research Discovery','Help students discover relevant research opportunities.',['Python','NLP','React'],87,'A. Saparova','1 team slot');
 s+=card(280,814,1104,130)+text(304,846,'Your path to a diploma project',16,C.text,700);
 [['01','Build your profile','Complete'],['02','Find your team','In progress'],['03','Choose a topic','Next'],['04','Get approval','Upcoming']].forEach(([n,l,status],i)=>{const x=304+i*270;s+=text(x,888,n,13,C.primary,700)+text(x+30,888,l,14,C.text,600)+text(x+30,914,status,12,C.muted);});
 return s;
}
function topics(){
 let s=shell('Explore topics')+title('Topic discovery','Find your diploma topic','Explore opportunities that fit your skills, interests, and ambitions.');
 s+=card(280,236,1104,80)+icon(302,264,'search')+text(340,282,'Search topics, technologies, or supervisors',14,C.muted)+button(1210,255,150,'Search');
 s+=card(280,340,240,602)+text(302,376,'Filter topics',17,C.text,700)+text(302,419,'Research area',13,C.text,600);
 [['All research areas',true],['Web development',false],['Artificial intelligence',false],['Data science',false],['Cybersecurity',false]].forEach(([v,on],i)=>{const y=440+i*38;s+=rect(303,y,16,16,on?C.primary:'#FFFFFF',4,on?'none':C.border);if(on)s+=text(306,y+13,'✓',12,'#FFFFFF',700);s+=text(332,y+13,v,12,C.muted);});
 s+=line(302,646,498,646)+text(302,681,'Availability',13,C.text,600)+rect(303,701,16,16,C.primary,4)+text(306,714,'✓',12,'#FFFFFF')+text(332,714,'Open topics only',12,C.muted)+text(302,763,'Technology',13,C.text,600)+pill(302,782,'Python')+pill(386,782,'React')+text(302,857,'Reset filters',13,C.primary,600);
 s+=text(544,367,'12 recommended topics',15,C.text,600)+text(1162,367,'Sort: Best match ↓',13,C.muted);
 s+=topicCard(544,390,'Campus Services Platform','A unified portal for campus requests and student services.',['React','FastAPI','PostgreSQL'],94,'N. Nadirov','2 team slots',840);
 s+=topicCard(544,626,'Student Research Discovery','Connect students with research topics using semantic search.',['Python','NLP','React'],87,'A. Saparova','1 team slot',840);
 s+=rect(544,864,840,78,'#EAF0F3',12)+text(566,895,'Recommendations are a starting point.',14,C.text,600)+text(566,920,'Explore freely. You choose which topic to pursue.',13,C.muted);
 return s;
}
function detail(){
 let s=shell('Explore topics')+text(280,130,'← Back to topics',13,C.primary,600)+pill(280,152,'WEB DEVELOPMENT')+pill(448,152,'Open for applications','#EDF5EA','#4B7841',164);
 s+=text(280,226,'Campus Services Platform',34,C.text,700)+text(280,258,'One place for students to request, track, and access campus services.',15,C.muted);
 s+=card(280,294,704,258)+text(304,334,'About the project',20,C.text,700);
 ['Students currently navigate separate channels for routine campus requests.', 'Design and build a web platform that brings these services together,', 'with clear ownership and visible request progress.'].forEach((t,i)=>s+=text(304,369+i*25,t,15,C.muted));
 s+=text(304,470,'Expected deliverables',14,C.text,600)+text(304,500,'Responsive web app · REST API · Usability evaluation',14,C.muted);
 s+=card(280,576,704,174)+text(304,616,'Skills and team requirements',20,C.text,700)+pill(304,637,'React')+pill(380,637,'FastAPI')+pill(470,637,'PostgreSQL')+text(304,710,'Team size: 2–3 students     Required roles: Frontend + Backend',14,C.muted);
 s+=card(280,774,704,162)+text(304,813,'Supervisor',18,C.text,700)+avatar(304,836,'NN')+text(360,853,'Nurtas K. Nadirov',16,C.text,600)+text(360,879,'School of Software Engineering',13,C.muted)+text(304,914,'Available capacity: 2 additional teams',13,C.primary,600);
 s+=card(1008,294,376,328)+pill(1032,318,'94% match')+text(1032,383,'Why this fits your profile',19,C.text,700);
 [['Skills overlap','Python, FastAPI, PostgreSQL'],['Shared interests','Campus tools and web platforms'],['Role alignment','Your backend role is relevant']].forEach(([a,b],i)=>{const y=416+i*57;s+=icon(1032,y-15,'check',C.primary)+text(1066,y,a,14,C.text,600)+text(1066,y+22,b,12,C.muted);});
 s+=rect(1008,646,376,290,'#E7F3EF',16)+text(1032,685,'Apply as a team',20,C.text,700)+text(1032,717,'Team: Campus Collective',14,C.text,600)+text(1032,745,'2 members · 1 open position',13,C.muted)+text(1032,786,'Review the requirements together.',13,C.muted)+text(1032,809,'Your supervisor makes the final decision.',13,C.muted)+button(1032,834,328,'Review application')+text(1032,910,'You can review before submitting.',12,C.muted);
 return s;
}
function team(){
 let s=shell('My team')+title('Team workspace','Better together.','Build a team with the skills your diploma project needs.')+button(1194,152,190,'Invite a student');
 s+=card(280,238,1104,224)+text(304,277,'Campus Collective',23,C.text,700)+pill(1158,255,'2 of 3 members','#F1F4F6',C.muted,202)+text(304,306,'Interested in practical tools that make university life easier.',14,C.muted);
 s+=avatar(304,334,'NZ')+text(360,352,'Nurdan Zhanabayev',15,C.text,600)+text(360,376,'Backend · Team owner',12,C.muted)+avatar(700,334,'AS','#EAE7F6')+text(756,352,'Alina S.',15,C.text,600)+text(756,376,'UX research · Product design',12,C.muted);
 s+=line(304,402,1360,402)+text(304,433,'Role coverage',13,C.muted)+pill(430,414,'Backend ✓')+pill(558,414,'Design ✓')+pill(676,414,'Frontend needed',C.warningSoft,C.warning,154);
 s+=text(280,509,'People who complement your team',22,C.text,700)+text(280,536,'Recommendations prioritize missing roles and shared interests.',14,C.muted)+text(1235,509,'View all →',13,C.primary,600);
 const people=[['YG','Yerasyl Gaziz','Frontend developer',['React','TypeScript'],'Adds frontend coverage','Shared interest in campus products'],['DK','Diana K.','Full-stack developer',['React','Python'],'Adds frontend coverage','Matches your preferred stack']];
 people.forEach(([initials,name,role,tags,why,why2],i)=>{const x=280+i*562;s+=card(x,560,542,286)+avatar(x+22,582,initials)+text(x+78,600,name,19,C.text,700)+text(x+78,626,role,13,C.muted)+pill(x+22,648,tags[0],'#F1F4F6',C.muted)+pill(x+130,648,tags[1],'#F1F4F6',C.muted)+icon(x+22,699,'check',C.primary)+text(x+54,716,why,13,C.primary,600)+text(x+54,740,why2,13,C.muted)+button(x+22,777,240,'View profile',false)+button(x+280,777,240,'Send invitation');});
 s+=card(280,870,1104,76)+icon(304,895,'people',C.primary)+text(342,900,'Invitations keep everyone in control.',14,C.text,600)+text(342,924,'A student joins only after accepting. Pending invitations do not reserve a team position.',13,C.muted);
 return s;
}
function supervisor(){
 let s=shell('Overview','Supervisor')+title('Supervisor overview','Make room for the next big idea.','Manage your topics, review teams, and keep your supervision load in view.')+button(1200,152,184,'Create topic');
 s+=stat(280,'Active topics','4','3 open for applications')+stat(560,'Pending applications','3','Awaiting your review')+stat(840,'Approved teams','3 / 5','2 team slots available')+stat(1120,'Students supervised','8','Across approved teams');
 s+=text(280,402,'Applications to review',22,C.text,700)+text(1236,402,'View all →',13,C.primary,600)+card(280,426,1104,334);
 s+=rect(281,427,1102,52,'#EDF2F3',15)+text(304,459,'TEAM / TOPIC',11,C.muted,700)+text(850,459,'ROLE COVERAGE',11,C.muted,700)+text(1065,459,'RECEIVED',11,C.muted,700)+text(1260,459,'ACTION',11,C.muted,700);
 [['Campus Collective','Campus Services Platform','Frontend · Backend · Design','14 Oct 2026'],['Data Bridge','Student Research Discovery','Data · Backend','13 Oct 2026'],['Study Circle','Peer Learning Platform','Frontend · Backend','12 Oct 2026']].forEach(([name,topic,roles,date],i)=>{const y=484+i*90;s+=text(304,y+30,name,16,C.text,600)+text(304,y+55,topic,13,C.muted)+text(850,y+38,roles,12,C.muted)+text(1065,y+38,date,12,C.muted)+button(1240,y+14,120,'Review',false);if(i<2)s+=line(304,y+84,1360,y+84);});
 s+=card(280,784,1104,160)+text(304,822,'Supervision capacity',18,C.text,700)+text(304,852,'3 approved teams out of a department limit of 5',14,C.muted)+rect(304,876,700,10,'#E8EFED',5)+rect(304,876,420,10,C.primary,5)+text(1040,885,'60% allocated',14,C.primary,600)+text(304,921,'Pending applications count toward capacity only when approved.',12,C.muted);
 return s;
}
function admin(){
 let s=shell('Overview','Administrator')+title('Department overview','A clear view of every allocation.','Monitor supervisor capacity and help teams find their next step.');
 s+=stat(280,'Registered students','148','Illustrative cohort data')+stat(560,'Approved teams','42','120 students allocated')+stat(840,'Students unallocated','28','18.9% of registered students')+stat(1120,'Supervisors at capacity','3 / 12','Review before new allocations');
 s+=rect(280,378,1104,92,C.warningSoft,16)+text(304,414,'3 supervisors have reached their team limit',18,C.warning,700)+text(304,442,'Direct new applications toward supervisors with open capacity.',14,C.warning)+button(1180,403,180,'View allocation',false);
 s+=text(280,516,'Supervisor capacity',22,C.text,700)+button(1200,487,184,'Manage limits',false)+card(280,542,1104,382);
 s+=rect(281,543,1102,50,'#EDF2F3',15)+text(304,575,'SUPERVISOR',11,C.muted,700)+text(690,575,'APPROVED / LIMIT',11,C.muted,700)+text(1040,575,'PENDING',11,C.muted,700)+text(1190,575,'STATUS',11,C.muted,700);
 [['Nurtas K. Nadirov','3 / 5',3,0.6],['A. Saparova','4 / 4',2,1],['M. Karimov','2 / 5',1,0.4],['D. Omarova','5 / 5',0,1]].forEach(([name,ratio,pending,pct],i)=>{const y=603+i*78;s+=text(304,y+29,name,15,C.text,600)+text(690,y+20,ratio,13,C.text,600)+rect(690,y+33,246,7,'#E8EFED',3)+rect(690,y+33,246*pct,7,pct===1?'#BD8A36':C.primary,3)+text(1040,y+29,pending,14,C.muted)+pill(1190,y+8,pct===1?'At capacity':'Available',pct===1?C.warningSoft:C.primarySoft,pct===1?C.warning:C.primary,150);if(i<3)s+=line(304,y+63,1360,y+63);});
 s+=text(280,958,'Capacity is checked again when a supervisor approves an application.',12,C.muted);
 return s;
}
const screens=[['01-dashboard','Student overview',dashboard],['02-explore-topics','Explore topics',topics],['03-topic-details','Topic details',detail],['04-my-team','My team',team],['05-supervisor','Supervisor overview',supervisor],['06-administrator','Department overview',admin]];
for(const [id,label,build] of screens){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1000" viewBox="0 0 1440 1000" role="img" aria-labelledby="title desc"><title id="title">ThesisFlow — ${esc(label)}</title><desc id="desc">Desktop design mockup. All names, scores, counts and records are illustrative sample data.</desc><g font-family="Arial, Helvetica, sans-serif">${build()}</g></svg>`;
 fs.writeFileSync(path.join(out,id+'.svg'),svg+'\n');
}
console.log(`Generated ${screens.length} SVG mockups.`);
