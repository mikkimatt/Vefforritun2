
```python
import pandas as pd
def lesa_gogn():
    stop_times = pd.read_csv('./gogn/stop_times.txt', encoding='ISO-8859-1', delimiter=',')
    stops = pd.read_csv('./gogn/stops.txt', encoding='ISO-8859-1', delimiter=',')
    trips = pd.read_csv('./gogn/trips.txt', encoding='ISO-8859-1', delimiter=',')
    trips = trips[trips['route_id'].str.startswith('ST.') & ~trips['route_id'].str.startswith('ST.10') & ~trips['service_id'].str.contains('S')]
    stop_times = stop_times[stop_times['pickup_type'] == 0]
    merged_data = pd.merge(pd.merge(stop_times, stops, on='stop_id'), trips, on='trip_id')
    return merged_data
```
