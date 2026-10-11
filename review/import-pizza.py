from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
p=root/'src/data/pizza-source-audit.json'
audit=json.loads(p.read_text())[:14];p.write_text(json.dumps(audit,indent=2)+'\n')
ids=['printed-packaging-7','paper-kraft-6','corrugated-plain-12','printed-corrugated-10','corrugated-2-ply-6','printed-white-7-5','printed-packaging-9','corrugated-3-ply-8','paper-kraft-7','printed-corrugated-8','white-corrugated-7','mono-carton','printed-duplex-7-5','brown-corrugated-6']
titles=['Printed pizza packaging box — 7 inch','Kraft paper pizza box — 6 inch','Plain corrugated pizza box — 12 inch','Printed corrugated pizza box — 10 inch','Two-ply corrugated pizza box — 6 inch','Printed white pizza box — 7.5 inch','Printed pizza packaging box — 9 inch','Three-ply corrugated pizza box — 8 inch','Kraft paper pizza box — 7 inch','Printed corrugated pizza box — 8 inch','White corrugated pizza box — 7 inch','Brown mono carton box','Printed duplex pizza box — 7.5 inch','Brown corrugated pizza box — 6 inch']
products=[];galleries={};jobs=[]
for i,s in enumerate(audit):
 d=dict(s['specs']);size=d.get('Size',d.get('Size (in Inch)'));material=d.get('Material',d.get('Paper Type',d.get('Material Grade','Board specifications on request')))
 groups=[]
 if i==11: groups=['Food cartons']
 else:
  if 'Printed' in s['title'] or d.get('Print & Branding'):groups.append('Printed & branded')
  if d.get('Design')=='Plain':groups.append('Plain boxes')
  if 'corrugated' in s['title'].lower() or 'corrugated' in material.lower():groups.append('Corrugated boxes')
  if 'Kraft' in material:groups.append('Kraft paper boxes')
  if 'White' in s['title'] or 'White' in material:groups.append('White boxes')
  if d.get('Print & Branding'):groups.append('Custom logo printing')
 if not groups:groups=['Corrugated boxes']
 files=[]
 for n,url in enumerate(s['images']):
  name=ids[i]+('-view-'+str(n) if n else '')+'.'+url.split('.')[-1]
  jobs.append([name,url]);files.append(name)
 galleries[ids[i]]=files[1:]
 specs=list(s['specs']);note=[]
 if d.get('Shape')=='Rectangular' and size:
  dims=re.findall(r'[\d.]+',size)
  if len(dims)>1 and dims[0]==dims[1]:note.append('Please confirm the shape with your quote: the listed length and width are equal, while the listed shape is rectangular.')
 if 'Size (in Inch)' in d:note.append('Only the nominal box size is listed. Please confirm full length, width and height with your quote.')
 if not size:specs.append(['Dimensions','Confirm available sizes with your quote'])
 if not d.get('Minimum Order Quantity'):specs.append(['Minimum order','Confirm quantity with your quote'])
 if i==11:note.append('This is a food and beverage carton. Please confirm its suitability for your product before ordering.')
 desc='Choose your quantity and branding requirements. We’ll help you confirm the right box, dimensions and price.'
 if i==11:desc='A brown folding food carton with a straight tuck end. Ask us about available dimensions and the right application for your product.'
 products.append(dict(id=ids[i],title=titles[i],image=files[0],group=groups[0],groups=groups,size=size,material=material,description=desc,specifications=specs,note=' '.join(note)))
(root/'src/data/pizzas.json').write_text(json.dumps(products,indent=2,ensure_ascii=False)+'\n')
(root/'src/data/pizza-galleries.json').write_text(json.dumps(galleries,indent=2)+'\n')
(root/'review/pizza-downloads.json').write_text(json.dumps(jobs))
print(json.dumps({'products':len(products),'fields':sum(len(x['specs']) for x in audit),'photos':len(jobs)}))
