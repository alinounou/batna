# Infinity Algo - AI Training Pipeline

## Overview

This document outlines the AI training pipeline for Infinity Algo's intelligent trading analysis system. Our approach combines supervised learning for pattern recognition with reinforcement learning for decision optimization.

## Training Pipeline Architecture

```mermaid
graph TB
    subgraph "Data Collection"
        JOURNAL[Trade Journal CSV]
        MARKET[Market Data]
        NEWS[News/Sentiment]
        CALENDAR[Economic Calendar]
    end

    subgraph "Feature Engineering"
        FE[Feature Store]
        INDICATORS[Technical Indicators]
        REGIME[Regime Detection]
        SENTIMENT[Sentiment Scoring]
    end

    subgraph "Model Training"
        CLUSTER[K-means Clustering]
        XGBOOST[XGBoost Classifier]
        LSTM[LSTM Networks]
        ENSEMBLE[Ensemble Model]
    end

    subgraph "Evaluation"
        BACKTEST[Backtesting]
        SHAP[SHAP Explainability]
        METRICS[Performance Metrics]
    end

    subgraph "Deployment"
        VERSION[Model Versioning]
        SERVE[Model Serving]
        MONITOR[Drift Detection]
    end

    JOURNAL --> FE
    MARKET --> FE
    NEWS --> FE
    CALENDAR --> FE
    
    FE --> INDICATORS
    FE --> REGIME
    FE --> SENTIMENT
    
    INDICATORS --> CLUSTER
    INDICATORS --> XGBOOST
    REGIME --> LSTM
    SENTIMENT --> ENSEMBLE
    
    CLUSTER --> ENSEMBLE
    XGBOOST --> ENSEMBLE
    LSTM --> ENSEMBLE
    
    ENSEMBLE --> BACKTEST
    BACKTEST --> SHAP
    SHAP --> METRICS
    
    METRICS --> VERSION
    VERSION --> SERVE
    SERVE --> MONITOR
```

## Feature Engineering

### Technical Indicators (50+ Features)

```python
FEATURES = {
    # Trend Indicators
    'sma_20', 'sma_50', 'sma_200',
    'ema_12', 'ema_26',
    'macd', 'macd_signal', 'macd_histogram',
    
    # Momentum Indicators
    'rsi_14', 'rsi_7',
    'stoch_k', 'stoch_d',
    'cci_20', 'williams_r',
    
    # Volatility Indicators
    'atr_14', 'atr_7',
    'bb_upper', 'bb_middle', 'bb_lower',
    'bb_width', 'bb_percent',
    
    # Volume Indicators
    'obv', 'vwap',
    'volume_sma_20', 'volume_ratio',
    
    # Price Features
    'high_low_range', 'close_to_high', 'close_to_low',
    'gap_up', 'gap_down', 'inside_bar', 'outside_bar',
    
    # Pattern Features
    'higher_high', 'higher_low', 'lower_high', 'lower_low',
    'doji', 'hammer', 'engulfing',
}
```

### Market Regime Detection

```python
REGIME_FEATURES = {
    'trend_strength',      # ADX-based
    'volatility_regime',   # ATR percentile
    'volume_regime',       # Volume percentile
    'momentum_regime',     # RSI-based
    'correlation_regime',  # Cross-asset correlation
}
```

### Sentiment Features

```python
SENTIMENT_FEATURES = {
    'news_sentiment',      # NLP from financial news
    'social_sentiment',    # Twitter/Reddit sentiment
    'fear_greed_index',    # Market sentiment index
    'put_call_ratio',      # Options sentiment
    'institutional_flow',  # Smart money tracking
}
```

## Model Architecture

### 1. Pattern Clustering (K-means)

```mermaid
graph LR
    A[Trade Data] --> B[Feature Extraction]
    B --> C[Normalization]
    C --> D[K-means Clustering]
    D --> E[Cluster Assignment]
    E --> F[Win Rate Analysis]
    
    subgraph "Clusters"
        C1[Breakout Trades]
        C2[Reversal Trades]
        C3[Range Trades]
        C4[Trend Following]
    end
    
    F --> C1
    F --> C2
    F --> C3
    F --> C4
```

### 2. XGBoost Regime Classifier

```python
# Model Configuration
xgboost_config = {
    'objective': 'multi:softprob',
    'num_class': 4,  # Bull, Bear, Range, Transition
    'max_depth': 6,
    'learning_rate': 0.1,
    'n_estimators': 1000,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'early_stopping_rounds': 50,
}
```

### 3. LSTM for Sequential Patterns

```mermaid
graph TB
    INPUT[Input Layer: 50 features]
    LSTM1[LSTM Layer 1: 128 units]
    DROPOUT1[Dropout: 0.2]
    LSTM2[LSTM Layer 2: 64 units]
    DROPOUT2[Dropout: 0.2]
    DENSE[Dense Layer: 32 units]
    OUTPUT[Output Layer: 4 classes]
    
    INPUT --> LSTM1
    LSTM1 --> DROPOUT1
    DROPOUT1 --> LSTM2
    LSTM2 --> DROPOUT2
    DROPOUT2 --> DENSE
    DENSE --> OUTPUT
```

## Training Process

### Weekly Retraining Schedule

```mermaid
gantt
    title Weekly Training Schedule
    dateFormat  YYYY-MM-DD
    section Data Collection
    Gather New Trades     :a1, 2024-01-01, 1d
    Fetch Market Data     :a2, after a1, 1d
    section Feature Engineering
    Calculate Features    :b1, after a2, 1d
    Update Feature Store  :b2, after b1, 1d
    section Training
    Train Models          :c1, after b2, 1d
    Validate Models       :c2, after c1, 1d
    section Deployment
    Version Models        :d1, after c2, 1d
    Deploy to Production  :d2, after d1, 1d
```

### Training Pipeline Code

```python
class TrainingPipeline:
    def __init__(self, config):
        self.config = config
        self.feature_store = FeatureStore()
        self.models = {
            'clustering': KMeansModel(),
            'regime': XGBoostModel(),
            'sequential': LSTMModel(),
        }
    
    async def run_weekly_training(self):
        # 1. Collect new data
        new_trades = await self.collect_trades()
        market_data = await self.collect_market_data()
        
        # 2. Feature engineering
        features = self.feature_store.engineer_features(
            trades=new_trades,
            market=market_data
        )
        
        # 3. Train models
        for model_name, model in self.models.items():
            model.train(features)
            model.validate()
        
        # 4. Ensemble predictions
        ensemble = self.create_ensemble()
        
        # 5. Deploy
        await self.deploy_models()
```

## SHAP Explainability Layer

```mermaid
graph TB
    subgraph "Model Prediction"
        MODEL[XGBoost Model]
        PRED[Prediction: Bullish 78%]
    end
    
    subgraph "SHAP Analysis"
        SHAP_VALUES[Feature Contributions]
        PLOT[Force Plot]
        SUMMARY[Summary Plot]
    end
    
    subgraph "User Explanation"
        TOP_FACTORS[Top Contributing Factors]
        INTERPRETATION[Natural Language]
    end
    
    MODEL --> PRED
    MODEL --> SHAP_VALUES
    SHAP_VALUES --> PLOT
    SHAP_VALUES --> SUMMARY
    SHAP_VALUES --> TOP_FACTORS
    TOP_FACTORS --> INTERPRETATION
```

### Example Explanation Output

```json
{
  "prediction": "bullish",
  "confidence": 0.78,
  "top_factors": [
    {
      "feature": "RSI oversold",
      "contribution": 0.23,
      "direction": "bullish"
    },
    {
      "feature": "Price above SMA 50",
      "contribution": 0.18,
      "direction": "bullish"
    },
    {
      "feature": "Volume surge",
      "contribution": 0.15,
      "direction": "bullish"
    }
  ],
  "explanation": "Strong bullish signal driven by oversold RSI conditions with price holding above key moving average. Volume surge suggests institutional accumulation."
}
```

## Model Performance Metrics

| Model | Accuracy | Precision | Recall | F1 Score | AUC-ROC |
|-------|----------|-----------|--------|----------|---------|
| XGBoost | 72.3% | 0.71 | 0.73 | 0.72 | 0.78 |
| LSTM | 68.5% | 0.67 | 0.70 | 0.68 | 0.74 |
| Ensemble | 75.8% | 0.74 | 0.77 | 0.75 | 0.82 |

## Model Versioning

```python
# Model Registry
MODEL_REGISTRY = {
    'v1.0.0': {
        'date': '2024-01-01',
        'performance': {'accuracy': 0.70, 'f1': 0.69},
        'features': 50,
        'status': 'deprecated'
    },
    'v1.1.0': {
        'date': '2024-02-01',
        'performance': {'accuracy': 0.72, 'f1': 0.71},
        'features': 55,
        'status': 'deprecated'
    },
    'v2.0.0': {
        'date': '2024-03-01',
        'performance': {'accuracy': 0.76, 'f1': 0.75},
        'features': 60,
        'status': 'production'
    },
}
```

## Monitoring & Drift Detection

```mermaid
graph LR
    A[Live Predictions] --> B[Log Predictions]
    B --> C[Compare Distribution]
    C --> D{Drift Detected?}
    D -->|Yes| E[Alert Team]
    D -->|No| F[Continue]
    E --> G[Trigger Retraining]
```

### Drift Metrics

- **PSI (Population Stability Index)**: Monitors feature distribution changes
- **Prediction Drift**: Tracks prediction confidence shifts
- **Performance Drift**: Monitors accuracy degradation

---

*Document Version: 1.0.0 | Last Updated: 2024*
