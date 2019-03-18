import requests

class graphQL:

	headers = {"Authorization": ""}

	"""docstring for graphQL"""
	def __init__(self):
		super(graphQL, self).__init__()

	def run_query(self, query): # A simple function to use requests.post to make the API call. Note the json= section.
		request = requests.post('https://api.github.com/graphql', json={'query': query}, headers=self.headers)
		if request.status_code == 200:
			return request.json()
		else:
			raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))

		
	def getClosedIssuesActors(self):
		listOfNames = []
		query = """
				query { 
					repository(owner: "tatmush", name: "Saturday-THORN-Dev-Rank"){
					  issues(states: CLOSED,first:100){
						edges{
						  node{
							... on Issue{
							  timeline(last: 100){
								edges{
								  node{
									__typename
									... on ClosedEvent{
									  actor{
										login
									  }
									}
								  }
								}
							  }
							}
						  }
						}
					  }
					}
				}
				"""

		result = self.run_query(query) #execute query
		a = result["data"]["repository"]["issues"]["edges"]
		for node in a:
			node1 = node["node"]["timeline"]["edges"]
			for innerNode in node1:
				if(innerNode["node"]["__typename"] == "ClosedEvent"):
					name = innerNode["node"]["actor"]["login"]
					listOfNames.append(name)
		return listOfNames