---
title: "Sparse Attention Routing for Long-Context Transformers"
authors:
  - "Rafa Fuentes"
  - "A. Collaborator"
venue: "arXiv preprint"
date: 2026-03-14
arxivId: "2603.01234"
pdfUrl: "https://arxiv.org/pdf/2603.01234"
codeUrl: "https://github.com/rafafuentesrangel/sparse-attention-routing"
tags: ["attention", "efficiency", "long-context"]
abstract: >
  We introduce a learned routing mechanism that sparsifies attention
  computation over long contexts without degrading downstream task
  accuracy. By predicting a small set of relevant key blocks per query
  before the dense attention pass, our method reduces the effective
  attention complexity from O(n^2) to O(n log n) on sequences up to
  128k tokens, while matching dense-attention baselines within 0.3
  perplexity points across standard long-context benchmarks.
bibtex: |
  @article{fuentes2026sparse,
    title={Sparse Attention Routing for Long-Context Transformers},
    author={Fuentes, Rafa and Collaborator, A.},
    journal={arXiv preprint arXiv:2603.01234},
    year={2026}
  }
---

Full write-up in progress. See the linked PDF and code for implementation details.
