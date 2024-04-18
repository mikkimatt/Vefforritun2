
```python
def run_kmeans(data, k, max_iter=100): 
    assignments = 0
    # Upphafsstillum k miðpunkta með því að hafa upphafsgisk sem slembigildi úr gögnunum
    centroids = [data[np.random.randint(len(data))] for _ in range(k)]

    # Ítrum yfir x punkta eins og talað er um í grein 3.6 í 3. kafla, flokkun vigra úr nótunum.
    # Ítrum þangað til að miðpunktar hætta að breytast.
    # Með því að uppfæra miðpunkta og úthluta punktum í hvert skipti. 
    for x in range(max_iter):
        assignments = assign(data, centroids)
        centroids = update(data, assignments, centroids)
    # Skilum úthlutuninni á miðpunktunum
    return np.array(assignments)

def assign(data, centroids):
    # Tökum setjum k sem fjölda miðpunkta eða flokka sem við viljum skipta gögnunum í.
    k = len(centroids)
    # Skilgreinum k-means flokkunina sem lista af listum sem hefur ekki fleiri flokka en k.
    kmeans = [[] for _ in range(k)] 
    
    # Reiknum út fjarlægðina milli miðpunkta og punktanna í gögnunum.
    # Þar sem við finnum alltaf minnstu fjarlægðina með því að nota np.argmin og setjum í kmeans.
    fjarMidpunkta = []
    # Þar sem p er stærð j skv, grein 3.4 í 3. kafla, flokkun vigra úr nótunum. 
    for p in range(k):
        fjarMidpunkta.append(np.linalg.norm(data-centroids[p], axis = 1))
    kmeans = np.argmin(fjarMidpunkta, axis=0)
    
    # Skilum k-means flokkuninni sem fylki af flokkum.
    return np.asarray(kmeans)

def update(data, assignments, centroids):
    # Uppfærum miðpunkta með því að reikna bestu hópaskiptinguna.
    nyrMidpunktur = []
    
    # Reiknum nýja miðpunkta með því að taka meðaltal af punktunum í flokkunum.
    for i in range(len(centroids)):
        flokkur = np.where(assignments == i)
        nyrMidpunktur.append(np.mean(data[flokkur], axis=0))
    return nyrMidpunktur
```
