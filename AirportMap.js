//airports data
const airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ');

const routes = [
	['PHX', 'LAX'],
	['PHX', 'JFK'],
	['JFK', 'OKC'],
	['JFK', 'HEL'],
	['JFK', 'LOS'],
	['MEX', 'LAX'],
	['MEX', 'BKK'],
	['MEX', 'LIM'],
	['MEX', 'EZE'],
	['LIM', 'BKK'],
];
/*  Not many routes compared to number of possible connections between these airports
	therefore, using an adjacency matrix would be inefficient since it would be very sparse
	(lots of zeroes) and thus take up a lot of unnecessary space

	better to use adjacency list, which just lists all edges (connections between nodes)
*/

// could use a regular object, but a map has more features for this
const adjacencyList = new Map();

// Create the nodes
function addNode(airport) {
	adjacencyList.set(airport, []);
}

// Add edge, undirected (no direction)
function addEdge(origin, destination) {
	adjacencyList.get(origin).push(destination);
	adjacencyList.get(destination).push(origin);
}

//Create the graph
airports.forEach(addNode);
routes.forEach(route => addEdge(...route))  // rest parameter

console.log(adjacencyList);

// Breadth-first search is good for finding the best possible route (shortest distance), but it can be slow
function bfs(start, dest) {

	console.log('Starting BFS...')
	const visited = new Set(); // Each element of a Set must be unique. This prevents infinite loop because airport routes might loop back
	const queue = [start];

	while(queue.length > 0) {
		const airport = queue.shift(); //shift pops the start of the queue to us, and shifts all items forward in the queue (FIFO)
		const destinations = adjacencyList.get(airport);

		for(const destination of destinations) {
			if(destination === dest) {
				console.log(`found ${dest}!`); // TODO: show found path (traceback)
			}
			if(!visited.has(destination)) {
				visited.add(destination); // add node to Set so it cannot be "found" again
				queue.push(destination); // add newly found nodes to our queue
				console.log(destination);
			}
			
		}
	}
}

bfs('PHX', 'BKK');

// This Depth-first search uses a stack, but it is kind of a hack since the call stack is already a stack. 
// So, we can just make it recursive and it behaves as though we had made a stack object.
function dfs(start, dest, visited = new Set()) {

	console.log(start)
	visited.add(start);
	const destinations = adjacencyList.get(start);

	for(const destination of destinations) {
		if(destination === dest) {
			console.log(`DFS: ${dest} found!`)
			return;
		}

		if(!visited.has(destination)) {
			dfs(destination, dest, visited);
		}
	}
}
console.log('Starting DFS...')
dfs('PHX', 'BKK')

// The TIME COMPLEXITY of these is O(n + e) where n = nodes, e = edges. Shortened to O(n) I think. 
