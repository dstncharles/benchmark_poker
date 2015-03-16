module.exports = function(app) {
  var express = require('express');
  var handsRouter = express.Router();
  var hands = [{
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }, {
    handInfo: {
      handNum: "89259-1",
      date: "2013-12-23",
      time: "01:00:51"
    },
    gameInfo: {
      gameName: "NL Hold'em",
      minBuyin: "25",
      maxBuyin: "200",
      smallBlind: "0.50",
      bigBlind: "1"
    },
    siteInfo: {
      siteName: "DepotPoker"
    },
    tableInfo: {
      tableName: "NLH Diamond .50/1"
    },
    seatsInfo: [{
      seat: "2",
      player: "goldenboy20",
      stackSize: "50"
    }, {
      seat: "6",
      player: "MoreChips",
      stackSize: "200"
    }],
    dealerInfo: {
      dealerName: "goldenboy20"
    },
    sBlindInfo: [{
      sBlindPlayer: "goldenboy20",
      sBlindAmt: "0.50"
    }],
    bBlindInfo: [{
      bBlindPlayer: "MoreChips",
      bBlindAmt: "1"
    }],
    preflopActions: [{
      player: "goldenboy20",
      amt: "3",
      allin: "",
      action: "raises"
    }, {
      player: "MoreChips",
      action: "folds"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "refunded"
    }, {
      player: "goldenboy20",
      amt: "2",
      action: "winsPot"
    }]
  }];

  handsRouter.get('/', function(req, res) {
    res.send({
      'hands': hands
    });
  });

  handsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  handsRouter.get('/:id', function(req, res) {
    res.send({
      'hands': {
        id: req.params.id
      }
    });
  });

  handsRouter.put('/:id', function(req, res) {
    res.send({
      'hands': {
        id: req.params.id
      }
    });
  });

  handsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/hands', handsRouter);
};
