interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// define price interface for
interface Price {
  [currency: string]: number;
}

class Datasource {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getPrices(): Promise<Price> {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }
    return response.json();
  }
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource(
      "https://interview.switcheo.com/prices.json"
    );
    datasource.getPrices().then(setPrices).catch(console.error);
  }, []);

  const getPriority = (blockchain: any) => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return undefined;
    }
  };

 const sortedBalances = useMeme(() => {
  return balances
    .filter((balance: WalletBalance | undefined) => {
      if (balance !== undefined) {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority !== undefined  && balance.amount > 0;
      }
      return false; // Filter out undefined balances explicitly
    })
    .sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain) || 0; 
      const rightPriority = getPriority(rhs.blockchain) || 0; 
      return rightPriority - leftPriority; 
    });
}, [balances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  //use formattedBalances for map
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={index}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

// define WalletRow
const WalletRow = ({ className, amount, usdValue, formattedAmount }) => (
  <div className={className}>
    <div>{formattedAmount}</div>
    <div>{amount}</div>
    <div>{usdValue}</div>
  </div>
);
