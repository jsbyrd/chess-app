import axios from 'axios';

type StockfishQueryParams = {
  fen: string;
  depth: number;
  mode: string;
}

type StockfishQueryReturn = {
  success: boolean;
  bestmove: string;
  evaluation: number;
  mate: number | null;
  contiuation: string;
}

const stockfishUri = 'https://stockfish.online/api/s/v2.php';

const getStockfishEval = async (fen: string): Promise<StockfishQueryReturn | null> => {
  
  const queryParams: StockfishQueryParams = {
    fen: fen,
    depth: 14,
    mode: 'bestmove'
  };

  try {
    const queryResponse = await axios.get(stockfishUri, {
      params: queryParams,
    });
    return queryResponse.data;
  }

  catch (err) {
    console.error("Something went wrong with the stockfish api request...");
    console.error(err);
  }

  return null;
}

export { getStockfishEval };