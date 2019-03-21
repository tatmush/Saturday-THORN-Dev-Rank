import requests
from collections import OrderedDict
import operator

class graphQL:

	headers = {"Authorization": "token bcd4dfaef8a197d367a07bfbddf879833ab0398d"}

	"""docstring for graphQL"""
	def __init__(self):
		super(graphQL, self).__init__()

	def run_query(self, query, variables): # A simple function to use requests.post to make the API call. Note the json= section.
		request = requests.post('https://api.github.com/graphql', json={'query': query, 'variables': variables}, headers=self.headers)
		if request.status_code == 200:
			return request.json()
		elif request.status_code == 401:
			raise Exception("Error!, Check your access token if it is valid or correct")
		else:
			raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))
	


	def getClosedIssuesActors(self):
		listOfNames = []
		query = '''
			query($owner: String!, $name: String!) { 
				repository(owner: $owner, name: $name){
				  issues(states: CLOSED, first:100){
					edges{
					  node{
						... on Issue{
						  timeline(last: 1){
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
			}'''
		variables = {
  			"owner": "tatmush",
  			"name": "Saturday-THORN-Dev-Rank"
		}	
			
		result = self.run_query(query, variables) #execute query
		print(result)
		a = result["data"]["repository"]["issues"]["edges"]
		for node in a:
			node1 = node["node"]["timeline"]["edges"]
			for innerNode in node1:
				if(innerNode["node"]["__typename"] == "ClosedEvent"):
					name = innerNode["node"]["actor"]["login"]
					listOfNames.append(name)
		return listOfNames

	def getContributors(self, repoOwner, repoName):
		listOfNames = []
		noError = True
		while noError:
			query = '''
				query($owner: String!, $name: String!) { 
					repository(owner: $owner, name: $name){
					  issues(states: CLOSED, first:100){
						edges{
						  node{
							... on Issue{
							  timeline(last: 1){
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
				}'''
			variables = {
					"owner": repoOwner,
					"name": repoName
			}	
				
			result = self.run_query(query, variables) #execute query
			try:
				a = result["data"]["repository"]["issues"]["edges"]
				for node in a:
					node1 = node["node"]["timeline"]["edges"]
					for innerNode in node1:
						if(innerNode["node"]["__typename"] == "ClosedEvent"):
							name = innerNode["node"]["actor"]["login"]
							listOfNames.append(name)

			#wrong arguemnts exception
			except Exception as error:
				print("There was an error in fetching data. Check if the repository owner and name is correct. Full error here: {}".format(error))

			finally:
				return self.dictOfContribs(listOfNames)


	def dictOfContribs(self, listOfNames):
		dictOfContribs = {}
		for person in listOfNames:
			if person in dictOfContribs:
				dictOfContribs[person]+=1
			else:
				dictOfContribs[person] = 1

		return OrderedDict(sorted(dictOfContribs.items(), key=lambda t: t[1], reverse=True))
