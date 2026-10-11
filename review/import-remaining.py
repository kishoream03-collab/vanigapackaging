import json,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
audit=json.loads((root/'src/data/remaining-source-audit.json').read_text())
def identity(url):return re.sub(r'-(?:125|250|500|1000)x(?:125|250|500|1000)','',url)
seen={};items=[];jobs={}
for c in audit:
 for p in c['products']:
  key=(identity(p['images'][0]),json.dumps(p['specs']))
  source=c['url']+'#'+(p['anchor'] or '')
  if key in seen:
   old=seen[key];old['sources'].append(source)
   for url in p['images']:
    if url not in old['sourceImages']:old['sourceImages'].append(url)
   continue
  title=p['title'];t=title.lower();d=dict(p['specs'])
  if any(x in t for x in ['bagasse','biodegrad','eco friendly']):category='eco'
  elif 'gift bag' in t:category='gifts'
  elif any(x in t for x in ['burger','chicken box','boat tray','paper tray','popcorn']):category='burger'
  elif any(x in t for x in ['roll','biryani','dosa','noodle','sandwich','iftar']):category='rolls'
  elif any(x in t for x in ['cake','brownie','sweet']):category='bakery'
  elif 'pizza' in t:category='pizza'
  elif 'container' in t or 'paper food boxes' in t:category='containers'
  else:category='cartons'
  slug=re.sub(r'[^a-z0-9]+','-',t).strip('-');id=slug
  n=2
  while any(x['id']==id for x in items):id=slug+'-'+str(n);n+=1
  size=next((v for k,v in p['specs'] if k.lower() != 'packaging size' and any(x in k.lower() for x in ['size','dimension'])),None)
  material=next((v for k,v in p['specs'] if any(x in k.lower() for x in ['material','paper type'])),None)
  sub='Plain boxes' if 'plain' in t or d.get('Design','').lower()=='plain' else 'Printed boxes' if 'print' in t else 'Other styles'
  if category=='burger':sub='Trays' if 'tray' in t else 'Chicken boxes' if 'chicken' in t else 'Popcorn & fries' if 'popcorn' in t else 'Burger boxes'
  if category=='rolls':sub='Roll boxes' if 'roll' in t else 'Sandwich boxes' if 'sandwich' in t else 'Meal boxes'
  if category=='eco':sub='Bagasse packaging' if 'bagasse' in t else 'Other eco packaging'
  if category=='bakery':sub='Brownie boxes' if 'brownie' in t else 'Sweet boxes' if 'sweet' in t else 'Cupcake boxes' if 'cupcake' in t else 'Cake boxes'
  if category=='cartons':sub='Pharma cartons' if 'pharma' in t else 'Mono cartons' if 'carton' in t or 'cartoon' in t else 'Food packaging' if 'food' in t else 'Corrugated boxes'
  specs=list(p['specs']);note=[]
  if not size:specs.append(['Dimensions','Available sizes need confirmation']);note.append('The source does not list dimensions. Please confirm your required size with your quote.')
  if not any('minimum' in k.lower() for k,v in specs):specs.append(['Minimum order','Confirm quantity with your quote'])
  item=dict(id=id,title=title,category=category,group=sub,size=size,material=material,specifications=specs,note=' '.join(note),sources=[source],sourceImages=p['images'],sourceCategory=c['category'])
  seen[key]=item;items.append(item)
for p in items:
 files=[]
 for url in p.pop('sourceImages'):
  if url not in jobs:
   name='product-'+str(len(jobs)+1)+'.'+url.split('.')[-1];jobs[url]=name
  files.append(jobs[url])
 p['image']=files[0];p['gallery']=files
(root/'src/data/packaging.json').write_text(json.dumps(items,indent=2,ensure_ascii=False)+'\n')
(root/'review/remaining-downloads.json').write_text(json.dumps([[name,url] for url,name in jobs.items()]))
(root/'public/images/packaging').mkdir(exist_ok=True)
print({'sourceListings':sum(len(c['products']) for c in audit),'uniqueListings':len(items),'photos':len(jobs),'categories':{c:sum(p['category']==c for p in items) for c in set(p['category'] for p in items)}})

# Reapply approved merges after a source refresh.
import runpy
runpy.run_path(str(root/"review/merge-products.py"))
