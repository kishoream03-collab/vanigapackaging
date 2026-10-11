"""Consolidate verified catalogue groups; preserve distinct photos and sources."""
import json,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=root/'src/data/packaging.json';products=json.loads(path.read_text())
# User removed these listings from the published catalogue.
products=[p for p in products if p['id'] not in ['paper-tray-supplier','boat-tray']]
groups=[
 ('printed-paper-burger-box',['printed-burger-box'],'Printed paper burger box'),
 ('fried-chicken-box',['broasted-chicken-box'],'Fried & broasted chicken box'),
 ('mono-carton-packaging-box',['duplex-monocarton-box-manufacture-in-bangalore','duplex-monocarton-box'],'Kraft mono carton packaging box'),
 ('mono-carton-boxes-manufacturers-in-bengaluru',['mono-cartons-corrugated-boxes'],'Brown kraft mono carton box'),
 ('cupcake-packaging-box',['packaging-box-for-cupcakes'],'Printed cupcake packaging box'),
]
redirects={};results=[]
for keep,removed,title in groups:
 members=[p for p in products if p['id'] in [keep,*removed]];target=next(p for p in members if p['id']==keep)
 target['title']=title
 target['mergedFrom']=list(dict.fromkeys(target.get('mergedFrom',[])+[p['id'] for p in members if p['id']!=keep]))
 target['sources']=list(dict.fromkeys(s for p in members for s in p['sources']))
 seen=set();gallery=[]
 for p in members:
  for name in p['gallery']:
   digest=hashlib.sha256((root/'public/images/packaging'/name).read_bytes()).hexdigest()
   if digest not in seen:seen.add(digest);gallery.append(name)
 target['gallery']=gallery;target['image']=gallery[0]
 for old in removed:redirects[old]=keep
 products=[p for p in products if p['id'] not in removed]
 results.append({'id':keep,'title':title,'photos':len(gallery),'mergedFrom':target['mergedFrom']})
path.write_text(json.dumps(products,indent=2,ensure_ascii=False)+'\n')
(root/'src/data/product-redirects.json').write_text(json.dumps(redirects,indent=2)+'\n')
(root/'review/product-merges.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps({'remainingListings':len(products),'merges':results},indent=2))
