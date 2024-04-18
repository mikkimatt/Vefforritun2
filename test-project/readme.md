# K-means reikniritið
## REI201G - Lokaverkefni
### Mikael Matthíasson - mim23@hi.is
### Þorsteinn Már Hafsteinsson - tmh5@hi.is

# Kafli 1
## Inngangur.
Markmið hópsins í þessu verkefni er að útfæra reikniritið K-means frá “grunni”. 
Verkefnið saman stendur af því að lesa inn gögn úr gagnasettum, fashion Mnist og Mnist. Flokka þau gögn niður með reikniritinu K-means sem verður útfært með numpy pakkanum í Python. Gróflega með því að finna miðpunkta (centroids) allra hópa eða flokka, finna bestu hópaskiptingu með því að finna lægsta gildi frá punkti x í miðpunkt m.
h := argmin ||xi - mj|| þar sem argmin er 1<=j<=k. Loks er notað k-means fallið til að ítra yfir bestu skiptinguna og útreikning miðpunktana.

# Kafli 2
## Framkvæmd og útskýringar.
Til þess að öðlast skilning á efninu byrjuðum við að skoða mikið af greinum á internetinu, t.d. 

| Heimildir |
| :---: |
| Fyrirlestra nótur úr [Kafla 3 - Flokkun vigra.](https://cs.hi.is/strei/kafli03/) |
| YouTube: [Umfjöllun StatQuest um K-means](https://www.youtube.com/watch?v=4b5d3muPQmA&ab_channel=StatQuestwithJoshStarmer) |
| Medium: [Skref fyrir skref á K-means](https://medium.com/data-folks-indonesia/step-by-step-to-understanding-k-means-clustering-and-implementation-with-sklearn-b55803f519d6) |

Fyrirlestra nótur úr [Kafla 3 - Flokkun vigra.](https://cs.hi.is/strei/kafli03/)
YouTube: [Umfjöllun StatQuest um K-means](https://www.youtube.com/watch?v=4b5d3muPQmA&ab_channel=StatQuestwithJoshStarmer)
Medium: [Skref fyrir skref á K-means](https://medium.com/data-folks-indonesia/step-by-step-to-understanding-k-means-clustering-and-implementation-with-sklearn-b55803f519d6)


Næst var það að fikra okkur áfram í kóðun reikniritsins með hjálp úr kafla 10 um numpy

K-means reikniritið er öflugt machine learning reiknirit sem tekur inn gögn í formi vigra eða gagna punkta og flokkar þá niður eftir bestu miðju hvers flokks. Þ.a.l. Eru gæði k-means mjög háð því í hve marga flokka gögnin eiga að skiptast. Það getur reynst flókið að velja rétt magn af flokkum til að skipta gögnunum í. Við getum nýtt okkur þetta til ákvarða hvaða gögn eru lík. T.d. í tilraunum á hópi fólks eða dýra sem gera eitthvað ákveðið. Eins og hvaða hópar fólks kýs eitthvað ákveðið í þingkosningum útfrá svipuðum svörum við spurningum eða flokka dýr eftir ákveðinni hegðun.

Eins og áður kom fram er einn helsti ókostur K-means að velja fjölda flokka til að skipta gögnum í, því ef valin er of lítil flokkaskipting eða of mikil flokkaskipting geta gögn skipst upp í flokka sem þau tilheyra ekkert endilega.

# Kafli 3
## Niðurstöður og framvinnda.
Verkefnið gekk virkilega erfiðlega til að byrja með. Það tók tíma í að öðlast skilning á reikniritinu gerir og til hvers að nota það. Þegar það var kominn einhver skilningurinn á efninu var enn erfiðara að koma þeim kenningum niður í Python kóða. Eftir að fá hjálp í dæmatíma fóru hjólin að rúlla og náðum að koma þessu yfir í kóða.


# Kafli 4
## Kóði sem við notuðum.
```python
def run_kmeans():
  centroids = np.array()
```
