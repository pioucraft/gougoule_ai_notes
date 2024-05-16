import { QdrantClient } from '@qdrant/js-client-rest';
import { DB_NAME, OLLAMA_EMBEDDING_MODEL } from '$env/static/private';
import axios from 'axios';

export let client = new QdrantClient({ host: 'localhost', port: 6333 });
const embeddingsLength = (
	await axios.post('http://127.0.0.1:11434/api/embeddings', {
		prompt: 'hi',
		model: OLLAMA_EMBEDDING_MODEL
	})
).data.embedding.length;

if (!(await client.collectionExists(DB_NAME)).exists) {
	await client.createCollection(DB_NAME, {
		vectors: { size: embeddingsLength, distance: 'Dot' }
	});
}
