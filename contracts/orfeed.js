pragma solidity ^0.4.26;


interface IKyberNetworkProxy {
    function maxGasPrice() external view returns(uint);
    function getUserCapInWei(address user) external view returns(uint);
    function getUserCapInTokenWei(address user, ERC20 token) external view returns(uint);
    function enabled() external view returns(bool);
    function info(bytes32 id) external view returns(uint);
    function getExpectedRate(ERC20 src, ERC20 dest, uint srcQty) external view returns (uint expectedRate, uint slippageRate);
    function tradeWithHint(ERC20 src, uint srcAmount, ERC20 dest, address destAddress, uint maxDestAmount, uint minConversionRate, address walletId, bytes hint) external payable returns(uint);
    function swapEtherToToken(ERC20 token, uint minRate) external payable returns (uint);
    function swapTokenToEther(ERC20 token, uint tokenQty, uint minRate) external returns (uint);
}

interface premiumSubInterface {
    function getExchangeRate(string fromSymbol, string toSymbol, string venue, uint256 amount, address requestAddress ) external view returns(uint256);

}


contract synthConvertInterface{
    function name (  ) external view returns ( string );
  function setGasPriceLimit ( uint256 _gasPriceLimit ) external;
  function approve ( address spender, uint256 value ) external returns ( bool );
  function removeSynth ( bytes32 currencyKey ) external;
  function issueSynths ( bytes32 currencyKey, uint256 amount ) external;
  function mint (  ) external returns ( bool );
  function setIntegrationProxy ( address _integrationProxy ) external;
  function nominateNewOwner ( address _owner ) external;
  function initiationTime (  ) external view returns ( uint256 );
  function totalSupply (  ) external view returns ( uint256 );
  function setFeePool ( address _feePool ) external;
  function exchange ( bytes32 sourceCurrencyKey, uint256 sourceAmount, bytes32 destinationCurrencyKey, address destinationAddress ) external returns ( bool );
  function setSelfDestructBeneficiary ( address _beneficiary ) external;
  function transferFrom ( address from, address to, uint256 value ) external returns ( bool );
  function decimals (  ) external view returns ( uint8 );
  function synths ( bytes32 ) external view returns ( address );
  function terminateSelfDestruct (  ) external;
  function rewardsDistribution (  ) external view returns ( address );
  function exchangeRates (  ) external view returns ( address );
  function nominatedOwner (  ) external view returns ( address );
  function setExchangeRates ( address _exchangeRates ) external;
  function effectiveValue ( bytes32 sourceCurrencyKey, uint256 sourceAmount, bytes32 destinationCurrencyKey ) external view returns ( uint256 );
  function transferableSynthetix ( address account ) external view returns ( uint256 );
  function validateGasPrice ( uint256 _givenGasPrice ) external view;
  function balanceOf ( address account ) external view returns ( uint256 );
  function availableCurrencyKeys (  ) external view returns ( bytes32[] );
  function acceptOwnership (  ) external;
  function remainingIssuableSynths ( address issuer, bytes32 currencyKey ) external view returns ( uint256 );
  function availableSynths ( uint256 ) external view returns ( address );
  function totalIssuedSynths ( bytes32 currencyKey ) external view returns ( uint256 );
  function addSynth ( address synth ) external;
  function owner (  ) external view returns ( address );
  function setExchangeEnabled ( bool _exchangeEnabled ) external;
  function symbol (  ) external view returns ( string );
  function gasPriceLimit (  ) external view returns ( uint256 );
  function setProxy ( address _proxy ) external;
  function selfDestruct (  ) external;
  function integrationProxy (  ) external view returns ( address );
  function setTokenState ( address _tokenState ) external;
  function collateralisationRatio ( address issuer ) external view returns ( uint256 );
  function rewardEscrow (  ) external view returns ( address );
  function SELFDESTRUCT_DELAY (  ) external view returns ( uint256 );
  function collateral ( address account ) external view returns ( uint256 );
  function maxIssuableSynths ( address issuer, bytes32 currencyKey ) external view returns ( uint256 );
  function transfer ( address to, uint256 value ) external returns ( bool );
  function synthInitiatedExchange ( address from, bytes32 sourceCurrencyKey, uint256 sourceAmount, bytes32 destinationCurrencyKey, address destinationAddress ) external returns ( bool );
  function transferFrom ( address from, address to, uint256 value, bytes data ) external returns ( bool );
  function feePool (  ) external view returns ( address );
  function selfDestructInitiated (  ) external view returns ( bool );
  function setMessageSender ( address sender ) external;
  function initiateSelfDestruct (  ) external;
  function transfer ( address to, uint256 value, bytes data ) external returns ( bool );
  function supplySchedule (  ) external view returns ( address );
  function selfDestructBeneficiary (  ) external view returns ( address );
  function setProtectionCircuit ( bool _protectionCircuitIsActivated ) external;
  function debtBalanceOf ( address issuer, bytes32 currencyKey ) external view returns ( uint256 );
  function synthetixState (  ) external view returns ( address );
  function availableSynthCount (  ) external view returns ( uint256 );
  function allowance ( address owner, address spender ) external view returns ( uint256 );
  function escrow (  ) external view returns ( address );
  function tokenState (  ) external view returns ( address );
  function burnSynths ( bytes32 currencyKey, uint256 amount ) external;
  function proxy (  ) external view returns ( address );
  function issueMaxSynths ( bytes32 currencyKey ) external;
  function exchangeEnabled (  ) external view returns ( bool );
}

interface ERC20 {
    function totalSupply() public view returns (uint supply);
    function balanceOf(address _owner) public view returns (uint balance);
    function transfer(address _to, uint _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint _value) public returns (bool success);
    function approve(address _spender, uint _value) public returns (bool success);
    function allowance(address _owner, address _spender) public view returns (uint remaining);
    function decimals() public view returns(uint digits);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
}

contract IERC20Token {
    // these functions aren't abstract since the compiler emits automatically generated getter functions as external
    function name() public view returns (string) {}
    function symbol() public view returns (string) {}
    function decimals() public view returns (uint8) {}
    function totalSupply() public view returns (uint256) {}
    function balanceOf(address _owner) public view returns (uint256) { _owner; }
    function allowance(address _owner, address _spender) public view returns (uint256) { _owner; _spender; }

    function transfer(address _to, uint256 _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
    function approve(address _spender, uint256 _value) public returns (bool success);
}


library SafeMath {
  function mul(uint256 a, uint256 b) internal constant returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal constant returns (uint256) {
    assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal constant returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal constant returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

    // Oracle Feed Contract
    contract orfeed {
    
        using SafeMath for uint256;
        
        /*

        ----


        Below is referenced for understanding for how flow works


        ----

        This will be set in external premium sub contract
        mapping(string => address) feedOwners;
        mapping(string => uint256) feedOwnerDeposits;
        mapping(string => address[]) feedSubscribers;

        //normalsubfee should always remain zero
        uint256 normalSubscriptionFee = 0;

     
        
        //voted on by owner DAO
        uint256 premiumSubscriptionFee = 1;

        //vote on by ownerDAO
        uint256 purchaseUntakenFeedFee = 1;

        //voted on by ownerDAO
        uint256 houseTransactionPercentage = 1;

        */

        //free ERC20 rates. Can be changed/updated by ownerDAO
        mapping (string => address) freeRateTokenSymbols;
        freeRateForexSymbols['DAI'] = 0x57ab1e02fee23774580c119740129eac7081e9d3;
        freeRateForexSymbols['USDC'] = 0xd71ecff9342a5ced620049e616c5035f1db98620;
        freeRateForexSymbols['MKR'] = 0x0f83287ff768d1c1e17a42f44d644d7f22e8ee1d;
        freeRateForexSymbols['LINK'] = 0xf6b1c627e95bfc3c1b4c9b825a032ff0fbf3e07d;
        freeRateForexSymbols['BAT'] = 0x97fe22e7341a0cd8db6f6c021a24dc8f4dad855f;
        freeRateForexSymbols['WBTC'] = 0x97fe22e7341a0cd8db6f6c021a24dc8f4dad855f;
        freeRateForexSymbols['OMG'] = 0x97fe22e7341a0cd8db6f6c021a24dc8f4dad855f;
        freeRateForexSymbols['ZRX'] = 0x97fe22e7341a0cd8db6f6c021a24dc8f4dad855f;
        freeRateForexSymbols['TUSD'] = 0x97fe22e7341a0cd8db6f6c021a24dc8f4dad855f;
        freeRateForexSymbols['ETH'] = 0x97fe22e7341a0cd8db6f6c021a24dc8f4dad855f;



         //free forex rates. Can be changed/updated by ownerDAO
        mapping (string => address) freeRateForexSymbols;
        freeRateForexSymbols['USD'] = 0x57ab1e02fee23774580c119740129eac7081e9d3;
        freeRateForexSymbols['EUR'] = 0xd71ecff9342a5ced620049e616c5035f1db98620;
        freeRateForexSymbols['CHF'] = 0x0f83287ff768d1c1e17a42f44d644d7f22e8ee1d;
        freeRateForexSymbols['JPY'] = 0xf6b1c627e95bfc3c1b4c9b825a032ff0fbf3e07d;
        freeRateForexSymbols['GBP'] = 0x97fe22e7341a0cd8db6f6c021a24dc8f4dad855f;


        //erc20 price oracle address. Can be changed by DAO
        address tokenPriceOracleAddress = 0x818E6FECD516Ecc3849DAf6845e3EC868087B755;

        //forex price oracle address. Can be changed by DAO
        address forexPriceOracleAddress = 0xc011a72400e58ecd99ee497cf89e3775d4bd732f;


        //premium price oracle address. Can be changed by DAO
        address premiumSubPriceOracleAddress = 0xc011a72400e58ecd99ee497cf89e3775d4bd732f;


        premiumSubInterface psi = premiumSubInterface(premiumSubInterface);

        address public owner = msg.sender;
        
         // Functions with this modifier can only be executed by the owner
         modifier onlyOwner() {
            if (msg.sender != owner) {
                throw;
            }
             _;
         }
         
      
      function () payable {
            throw;
        }



        //this will go to a DAO
      function changeOwner(address newOwner) onlyOwner external returns(bool){
            owner = newOwner;
            return true;
      }

/*
Below is referenced and referred to in the external contract. Mentioned here for reader to get understanding of flow

This will be set in external premium sub contract
      function changePremiumSubscriptionFee(uint256 newFee) onlyOwner external returns(bool){
        premiumSubscriptionFee = newFee;
      }

      function changePurchaseUntakenFeedFee(uint256 newFee) onlyOwner external returns(bool){
        purchaseUntakenFeedFee = newFee;
      }


*/




      //returns zero if the rate cannot be found
      function getExchangeRate(string fromSymbol, string toSymbol, string venue, uint256 amount ) constant returns (bool, uint256){

        bool isFreeFrom = isFree(fromSymbol);
        bool isFreeTo = isFree(toSymbol);
        bool isFreeVenue = isFreeVenue(venue);


        if(isFreeFrom == TRUE && isFreeTo ==TRUE && isFreeVenue == TRUE){

          uint256 rate = getFreeExchangeRate(fromSymbol, toSymbol);
          return rate;

        }

        else{
          //init.sender and msg.sender must have premium
          uint256 rate = psi.getExchangeRate(msg.sender, fromSymbol, toSymbol);

          return rate;

        }


      }


    }

    
   

