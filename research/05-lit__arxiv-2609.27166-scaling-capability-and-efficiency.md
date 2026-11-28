---
title: "Scaling of Capability and Efficiency at Inference Time in Large Reasoning Models"
publisher_or_filer: "arXiv"
arxiv_id: "2609.27166"
abstract_page: "https://arxiv.org/abs/2609.27166"
pdf_url: "https://arxiv.org/pdf/2609.27166"
source_url: "https://arxiv.org/pdf/2609.27166"
version_history: "v1 Tue, 22 Sep 2026 23:56:45 UTC; v2 Thu, 24 Sep 2026 12:42:52 UTC"
subjects: "Machine Learning (cs.LG); Physics and Society (physics.soc-ph)"
submitted_by: "Moritz Nikolaus Laber"
retrieved_on: "2026-11-27"
retrieval_method: "Full text converted to Markdown with the Jina Reader service (r.jina.ai), run through the browser (PDF text (latest version))"
authors: "Moritz Laber; Zohair Shafi; Germans Savcisens; Brennan Klein; Matteo Chinazzi; Samuel V. Scarpino; Albert-László Barabási; Alessandro Vespignani; Tina Eliassi-Rad"
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
changes: "Converted to Markdown text by an automated reader (see retrieval_method); this metadata header and the title/abstract block above the paper text were added; figures and some table layout are not preserved."
---
# Scaling of Capability and Efficiency at Inference Time in Large Reasoning Models

**arXiv:2609.27166** | [Abstract page](https://arxiv.org/abs/2609.27166) | [PDF](https://arxiv.org/pdf/2609.27166)

**Abstract.** Capability and efficiency are two key dimensions of reasoning in large language models (LLMs). Capability refers to the ability to solve a given problem correctly, whereas efficiency refers to the ability to do so with limited resources. When LLMs use Chain-of-Thought (CoT) reasoning to solve problems of controlled hardness, both the number of problems solved correctly and the number of tokens required to reach a correct answer depend on problem hardness and model size. However, how these factors jointly shape capability and efficiency remains poorly understood. Here, we use hierarchical Bayesian models to evaluate the capability and efficiency of LLMs from the DeepSeek-R1-Distill model family across four classes of arithmetic and algorithmic reasoning problems. At a fixed model size, the probability of correctly solving an instance decays approximately exponentially with instance size, our proxy for problem hardness. The decay scale grows sublinearly with model size, indicating that larger models are more capable, but that capability gains diminish with scale. Output length grows as a power law with instance size, which serves as a proxy for difficulty. However, the parameters of this power law do not vary systematically with model size, suggesting that larger models do not become more efficient. Together, these findings reveal potential limitations of naive scaling as a strategy for developing more capable AI systems: capability improves with diminishing returns, while efficiency shows little to no improvement.

---

## Scaling of Capability and Efficiency at Inference Time in Large Reasoning Models 

Moritz Laber, 1, 2, ∗ Zohair Shafi, 1 Germans Savcisens, 1 Brennan Klein, 1 Matteo Chinazzi, 1

Samuel V. Scarpino, 1, 3 Albert-L´ aszl´ o Barab´ asi, 1 Alessandro Vespignani, 1 and Tina Eliassi-Rad 1, 3 

> 1

Northeastern University, Boston, Massachusetts, USA 

> 2

Complexity Science Hub Vienna, Vienna, Austria 

> 3

Santa Fe Institute, Santa Fe, New Mexico, USA 

(Dated: September 25, 2026) Capability and efficiency are two key dimensions of reasoning in large language models (LLMs). Capability refers to the ability to solve a given problem correctly, whereas efficiency refers to the ability to do so with limited resources. When LLMs use Chain-of-Thought (CoT) reasoning to solve problems of controlled hardness, both the number of problems solved correctly and the number of tokens required to reach a correct answer depend on problem hardness and model size. How-ever, how these factors jointly shape capability and efficiency remains poorly understood. Here, we use hierarchical Bayesian models to evaluate the capability and efficiency of LLMs from the 

DeepSeek-R1-Distill model family across four classes of arithmetic and algorithmic reasoning problems. At a fixed model size, the probability of correctly solving an instance decays approxi-mately exponentially with instance size, our proxy for problem hardness. The decay scale grows sublinearly with model size, indicating that larger models are more capable, but that capability gains diminish with scale. Output length grows as a power law with instance size, which serves as a proxy for difficulty. However, the parameters of this power law do not vary systematically with model size, suggesting that larger models do not become more efficient. Together, these findings reveal potential limitations of naive scaling as a strategy for developing more capable AI systems: capability improves with diminishing returns, while efficiency shows little to no improvement. 

I. INTRODUCTION 

Scaling laws are a cornerstone of modern artificial in-telligence (AI). By linking invested resources (e.g., com-pute) to expected model performance (e.g., loss), they can inform model design and resource allocation [1–4] and even help explain apparently “emergent” behavior in large language models (LLMs) [5–7]. Current models are developed through multistage training processes [8–10] and require substantial re-sources during deployment [4, 11]. Thus, scaling is rele-vant throughout the model life cycle. However, depend-ing on the stage, the relevant resources, performance met-rics, and functional relationships between them can dif-fer. Although scaling laws are traditionally associated with power-law relationships, the term is also commonly used more broadly to describe resource–performance rela-tionships regardless of their functional form. We use the term in this broader sense throughout the manuscript. Classical neural scaling laws concern pretraining and describe how a model’s loss on held-out data decays approximately as a power law with parameter count, dataset size, and compute budget over ranges spanning several orders of magnitude [1, 2, 12]. Subsequent the-oretical work has sought to explain these empirical re-lationships [13–15], while other studies have questioned their universality and precise functional form [16, 17]. Modern models undergo extensive post-training, in-cluding supervised fine-tuning (SFT) [18–20], rein- 

> ∗laber.m@northeastern.edu

forcement learning from human feedback (RLHF) [21– 23], and reinforcement learning with verifiable rewards (RLVR) [8, 24–26]. Therefore, understanding how perfor-mance scales with the resources devoted to these stages is increasingly important [4]. However, compared with pretraining, post-training exhibits less universal scaling behavior and has received less theoretical treatment. Al-though SFT can improve model performance across a range of metrics, no single functional form for SFT scal-ing is widely accepted, and empirical findings depend strongly on the experimental setup [18, 27–30]. Similarly, RLHF has been shown to improve align-ment with human preferences, but its scaling behavior depends on factors such as feedback quality and opti-mization choices [19, 31, 32]. Moreover, its reliance on human annotators may limit its scalability, motivating approaches such as reinforcement learning from AI feed-back (RLAIF) [33, 34]. RLVR has been credited with driving recent advances in the reasoning abilities of LLMs and large reasoning models (LRMs) [8–10, 26], although the extent of its con-tribution remains debated [35, 36]. As the RLVR com-pute budget increases, empirical studies have reported different scaling relationships, including diminishing or saturating gains in pass rate and power-law decreases in loss [37–39]. Other studies suggest that data quality may matter more than quantity [40–42]. More recently, test-time compute (TTC) techniques have introduced another dimension of scaling during model deployment [4, 11]. Chain-of-Thought (CoT) rea-soning is a prominent TTC technique in which models solve challenging problems through a sequence of inter-mediate steps [8–10]. Performance on mathematics and arXiv:2609.27166v2 [cs.LG] 24 Sep 2026 2logic problems has been shown to decrease or vary non-monotonically as CoT length increases [43–46]. This non-monotonic behavior suggests the existence of an op-timal CoT length, with deviations from this optimum studied as “underthinking” and “overthinking” [47–51]. Rather than allocating TTC to a single long CoT, parallel exploration distributes it across multiple shorter CoTs. Whether TTC is better allocated sequentially or in par-allel remains an active topic of debate [52, 53]. Unlike compute expended during pretraining, SFT, and post-training reinforcement learning, inference-time compute incurs a marginal cost for every query rather than being amortized across queries. This raises the question of how performance gains from TTC depend on model size [3]. More broadly, it motivates a holistic view of scaling in which resources are allocated optimally across the entire model life cycle. Beyond scaling with resources, researchers have asked whether performance on reasoning problems exhibits a law-like dependence on problem hardness. Although performance generally declines as problem hardness in-creases, the functional form of this decline appears non-universal and sensitive to experimental details [54–58]. Efforts to characterize this dependence, coupled with the demand for minimally contaminated test sets, have spurred the development of new reasoning benchmarks and synthetic dataset generators [59–62]. Our main contributions characterize capability and ef-ficiency scaling in LRMs through extensive experiments on five model sizes from the DeepSeek-R1-Distill 

model family, ranging up to 70 B parameters and eval-uated on more than 4 ,000 reasoning problem instances per model size: 1. Exponential performance decline: We show that the probability of correctly solving a problem instance declines exponentially with instance size. 2. Capability scaling: We find that the character-istic scale of this exponential decay increases as a power law with the number of model parameters, indicating that larger models can solve larger and harder problem instances. 3. Output-length scaling: We find that, among correctly solved instances, output length increases approximately as a power law with instance size. 4. Absence of efficiency scaling: We observe that, for the studied model family, the prefactor and ex-ponent governing output-length scaling vary only weakly with the number of model parameters, pro-viding little evidence that larger models are more token efficient. 

Paper outline. We first introduce our evaluation strategy (Sec. II A). Next, we examine how the number of correctly solved instances varies with instance size and model parameter count (Sec. II B). We then analyze out-put length among correctly solved instances as a function of the same variables (Sec. II C). Finally, we discuss the implications, limitations, and broader impact of our work (Sec. III). Methodological details are provided in Sec. IV.   

> II. RESULTS A. Evaluation Strategy

Our evaluation strategy treats capability and efficiency as latent model traits that cannot be observed directly. We infer them from the number of correctly solved in-stances and the observed output lengths, respectively. Similarly, how these traits scale with model size N is a latent property of the model family that must be inferred. Figure 1 provides a schematic overview of our approach. In our experiments, we evaluate five LRMs from the 

DeepSeek-R1-Distill family [8], with parameter counts 

N ∈ { 1.5 B , 7 B , 14 B , 32 B , 70 B }. We sample responses at temperatures τ ∈ { 0.4, 0.6, 0.8}. Because τ = 0 .6 is the recommended setting, we use it as our primary set-ting and use the other temperatures to assess the robust-ness of our findings to changes in sampling temperature. Further details are provided in Methods (Sec. IV A). We evaluate these models on randomly generated in-stances from four reasoning tasks with tunable hard-ness: addition , brackets , parity , and index . In the 

addition task, the model must sum n integers drawn from the set {0, . . . , 100 }. The brackets task asks the model to determine whether a sequence of n bracket sym-bols is properly nested. In the parity task, the model must determine whether the number of ones in a length-

n binary string is even or odd. Finally, an instance of the index task consists of a list of n integers drawn from 

{0, . . . , 100 } and a position 0 ≤ i < n . The model must return the element at that position. We formally define these tasks and describe how instances are generated in Methods (Sec. IV B). Table I summarizes the tasks, their hardness parameters, and example prompts. These tasks have several desirable properties. First, their difficulty can be controlled through the instance size 

n, with larger instances generally being more challenging than smaller ones. For example, summing 10 numbers is reasonably assumed to be less challenging than summing 100 numbers. Second, all four tasks admit polynomial-time algorithms. Thus, in principle, models can solve every instance using an efficient procedure rather than relying on guesses, heuristics, or exhaustive search over possible solutions. These algorithms also allow us to ver-ify model answers efficiently. Third, task hardness can be characterized not only through classical measures of time and space complexity but also through transformer-specific frameworks such as Bounded Attention Prefix Oracle ( BAPO ) complexity [63, 64]. Table I lists the time, space, and BAPO complexity of each task and shows that our evaluation covers tasks that are BAPO -easy and tasks that are conjectured to be BAPO -hard. We discuss task hardness in greater detail in Methods (Sec. IV B). A Evaluation Strategy 3addition Add the following numbers: 1,31,42,10. Give your final answer within \boxed{}. <think> 

> Instance size

(a) Reasoning Problems (b) Chain ‐of ‐Thought Reasoning (c) Evaluation 1: Capability (d) Evaluation 2: E ffi ciency 

> Determine the parity of the following binary string: 0110. Respond with even or odd. Give your final answer within \boxed{}. <think>

parity Instance size 

> What is the element at position 3 in the sequence 1,10,20,5. Respond with the element. Use zero-based indexing. Give your final answer within \boxed{}. <think>

index Instance size 

> Check whether the brackets are properly nested in the following string: {([]())}. Answer only with True or False. Give your final answer within \boxed{}. <think>

brackets Instance size Input: Random task instance Output     

> Add the following numbers: 1,31,42,10. Give your final answer within \boxed{}. <think> Let me think. The user wants me to add some numbers. The numbers are 1, 31, 42, 10. First, I add 1 + 31 = 32. Then, 32 + 42 = 74. Next, 74 + 10 = 84. Let me check this: 1 + 31 + 42 + 10 = 84. </think>. The final answer is \boxed{84}.
> Number of instances Number of instances Number of instances Number of instances
> Large Reasoning Models with parameters
> prompting CoT reasoning Output Length Final answer typical solvable instance size number of parameters correct instances instance size output length instance size
> output ‐length scaling
> effi ciency exponent number of parameters
> effi ciency scaling correctness decay capability scaling
> scaling exponent decay scale scaling exponent exponent prefactor

FIG. 1. Evaluation setup. (a) We evaluate models from the DeepSeek-R1-Distill family on R randomly generated instances from each of four reasoning tasks: addition , brackets , index , and parity (example prompts shown). These tasks allow us to control problem hardness through the instance size n. (b) We prompt models with different parameter counts N to solve these instances using CoT reasoning. For the answer ˆ aN,n,τ,r produced by a model with N parameters for instance r of size n at temperature τ , we record whether the answer is correct and measure the output length ℓN,n,τ,r . (c) To assess capability scaling, we first quantify, at fixed N and τ , the exponential decay in the number of correctly solved instances yN,n,τ with instance size 

n. We then determine how the corresponding decay scale νN,τ depends on model size N . (d) To assess efficiency scaling, we first model the average output length of correct responses, ¯ℓN,n,τ , as a power law in instance size n. We then evaluate whether the parameters of this relationship, i.e., its prefactor AN,τ and exponent αN,τ , scale with model size N .

For each task and instance size n, we generate R = 100 independent instances and determine the correct an-swer an,r for each instance r. We use instance sizes 

n ∈ { 2, 10 , 50 , 100 , 150 , . . . , 500 }. We then prompt each model with N parameters to solve each instance at tem-perature τ and extract the predicted answer ˆ aN,n,τ,r from its output. We also record the output length in to-kens of the model’s native tokenizer, denoted by ℓN,n,τ,r .We describe the answer-extraction procedure in Methods (Sec. IV C). The two key observables of our study are the number of correctly solved instances and the average output length among correct responses. To determine them, we define the set CN,n,τ of instances of size n correctly answered by a model of size N at temperature τ ,

CN,n,τ = {r ∈ { 1, . . . , R } : ˆ aN,n,τ,r = an,r } . (1) The number of instances of size n that are correctly solved by a model of size N at temperature τ is 

yN,n,τ = |C N,n,τ | . (2) The average output length among correct responses from a model of size N at temperature τ to an instance of size 

n is ¯ℓN,n,τ = 1

yN,n,τ 

X

r∈C N,n,τ 

ℓN,n,τ,r , (3) and its variance is s2

N,n,τ 

s2

N,n,τ = 1

yN,n,τ 

X

r∈C N,n,τ 

(ℓN,n,τ,r − ¯ℓN,n,τ )2. (4) Equations (3) and (4) are defined only when the model solves at least one instance correctly, that is, when 

yN,n,τ > 0. We exclude configurations that do not satisfy this condition from our analysis of model efficiency. To infer model capability and its dependence on model size N , we use hierarchical Bayesian models. To distin-guish them from the reasoning models under study, we refer to them as statistical models throughout. For an LRM with N parameters evaluated at temper-ature τ , we model the number yN,n,τ of correctly solved instances among R independently generated size-n prob-lem instances as 

yN,n,τ ∼ Binomial ( R, p N,τ (n)) , (5) where pN,τ (n) is the probability of correctly solving a size-n instance. We assume pN,τ (n) decays exponentially in n with decay constant νN,τ ,

pN,τ (n) = p(∞)

N,τ +



p(0) 

τ − p(∞)

N,τ 



exp 



− nνN,τ 



, (6) where p(0) 

τ ∈ [0 , 1] governs the probability that a hypo-thetical size n = 0 instance is solved correctly, and the A Evaluation Strategy 4large-n asymptote p(∞) 

> N,τ

∈ [0 , 1] is the limiting probability that an instance is solved correctly as n → ∞ .1 The pa-rameter νN,τ > 0 has the same units as n and determines the characteristic scale over which performance decays. We treat νN,τ as a measure of the capability of a model with N parameters evaluated at temperature τ .To understand how capability scales with model size 

N , we assume that the capabilities within a model family are connected through a latent scaling law, i.e., log νN,τ = log C(ν) 

> τ

+ β(ν) 

> τ

log N

˜N + η(ν) 

> τ

ξ(ν) 

> N,τ

, (7) where β(ν) 

> τ

is the scaling exponent, C(ν) 

> τ

is the prefactor, and η(ν) 

> τ

determines the standard deviation of the multi-plicative Gaussian noise ξ(ν) 

> N,τ

∼ N (0 , 1) that accounts for deviations from the scaling law, e.g., through finite-size effects. We use ντ (N ) to denote the quantity in Eq. (7) without these deviations. We rescale all model sizes N

under consideration by their geometric mean ˜N for nu-merical stability. We study two versions of this statistical model. In the version defined above, which we call the variable asymp-tote model (VAM), the large-n asymptote p(∞) 

> N,τ

may vary with model size N . In the alternative fixed asymptote model (FAM), the asymptote is shared across model sizes, such that p(∞) 

> N,τ

= p(∞) 

> τ

.To fully specify these hierarchical Bayesian models, we need to put priors on all model parameters. We discuss the choice of priors in Methods Sec. IV D. We infer all pa-rameters using Monte Carlo sampling and provide details on sampling hyperparameters in Methods Sec. IV E. We take a similar approach to modeling efficiency, op-erationalized as using few tokens for solving a task, but adjust our parametric assumptions accordingly. We as-sume that the logarithm of the average output length among correct responses produced by a model with N

parameters at temperature τ follows a normal distribu-tion with mean log λN,n,τ = log AN,τ + αN,τ log n

˜n , (8) where ˜ n is the geometric mean of the considered instance sizes. The corresponding variance is 

ω2 

> N,n,τ

= s2

> N,n,τ

yN,n,τ λ2

> N,n,τ

+ ζ2 

> τ

, (9) where the first term captures the sampling variance of the estimated mean at fixed model size N , temperature 

τ , and instance size n, while the second term, ζ2 

> τ

, cap-tures excess variation. We derive the form of ω2 

> N,n,τ

in Appendix A.      

> 1We require p(∞)
> N,τ ≤p(0)
> τto ensure that performance declines with instance size.

We compare two statistical models of scaling across model sizes. The more flexible statistical model, which we call the prefactor exponent model (PEM), accounts for the possibility that both the prefactor AN,τ and the scaling exponent αN,τ in Eq. (8) scale with the reasoning model size N , i.e., log AN,τ = log C(A) 

> τ

+ β(A) 

> τ

log N

˜N + η(A) 

> τ

ξ(A) 

> N,τ

(10) and log αN,τ = log C(α) 

> τ

+ β(α) 

> τ

log N

˜N + η(α) 

> τ

ξ(α) 

> N,τ

, (11) where C(A) 

> τ

, C(α) 

> τ

are prefactors, β(A) 

> τ

, β(α) 

> τ

are scaling exponents, and η(A) 

> τ

, η(α) 

> τ

govern the magnitudes of the multiplicative Gaussian noise ξ(A) 

> N,τ

and ξ(α) 

> N,τ

, respectively. We use Aτ (N ) and ατ (N ) to denote the quantities in Eqs. (10) and (11), respectively, with the random effects set to zero. A parsimonious alternative statistical model is the 

prefactor model (PM), in which the exponent αN,τ has no systematic dependence on N . The PM can be obtained from the PEM by fixing β(α) 

> τ

= 0. When presenting our results, we use E[θ | D ] to denote the posterior mean of a parameter θ conditional on the relevant data D. We also use the notation CrI 95% [θ] to denote the 95% credible interval of θ. 

> B. Capability

We illustrate our approach to quantifying the capabil-ity of an LRM using the addition task at temperature 

τ = 0 .6 under the FAM. We provide detailed results for the other tasks ( brackets , index , and parity ), temper-atures ( τ ∈ { 0.4, 0.8}), and the VAM in Appendix B 1. Fitting the FAM to the results of the addition task at τ = 0.6 provides evidence that the characteristic instance-size scale νN,τ scales with the number of param-eters N (Fig. 2 (a) ). The inferred scale η(ν) 

> τ

of deviations from the latent scaling law ντ (N ) is small, with a poste-rior mean of E[η(ν) 

> τ

| D ] ≈ 0.20. The inferred scaling is sublinear, with a posterior mean of the scaling exponent E[β(ν) 

> τ

| D ] ≈ 0.69 and a 95% credible interval of CrI 95% [β(ν) 

> τ

] ≈ (0 .53 , 0.85) (Fig. 2 (b) ). At the posterior mean, doubling the param-eter count of a DeepSeek-R1-Distill model increases the characteristic instance-size scale of the exponential decline by a factor of 2 0.69 ≈ 1.61. Inspecting the performance decay at fixed parameter counts (Fig. 2 (c) –(g) ), we find that the exponential de-cay with a shared asymptote, as assumed in the FAM, describes the data well. The probability of correctly solving an instance, pN,τ (n), recapitulates the trends in the observed fraction of correctly solved instances 

yN,n,τ /R . Moreover, the FAM has a higher expected B Capability 510 9 10 10 10 11 

N

> 10 1
> 10 2
> 10 3
> ν

(a)           

> ντ(N)CrI 95% [ντ(N)]
> νN,τ
> 0.20.40.60.81.01.2

β(ν)

> τ
> 0246
> p(β(ν)
> τ )

(b) mean   

> p
> (
> β(ν)
> τ
> )
> 0250 500

n

> 0.00.51.0
> yN,n,τ  /R

(c)        

> N=1.5 B
> pN,τ (n)CrI 95% [pN,τ (n)]
> yN,n,τ /R
> 0250 500

n

(d)    

> N=7 B
> 0250 500

n

(e)    

> N=14 B
> 0250 500

n

(f)    

> N=32 B
> 0250 500

n

(g)  

> N=70 B

FIG. 2. Capability scaling. Fitting the FAM to data from the addition task at temperature τ = 0 .6 suggests that (a) the exponential decay scale νN,τ (orange circles) increases approximately as a power law with N , and deviations from the latent scaling curve ντ (N ) (blue line) are small. (b) The posterior of the scaling exponent concentrates on positive values smaller than one and has mean E[β(ν) 

> τ

| D ] ≈ 0.69 (black dashed line). (c)–(g) The probability of correctly solving an instance, pN,τ (n)(magenta lines), decays exponentially toward a shared asymptote and closely follows the observed fraction of correctly solved instances yN,n,τ /R (yellow circles) as a function of instance size n for increasing model sizes N (at (c) N = 1 .5 B, (d) N = 7 B, 

(e) N = 14 B, (f ) N = 32 B, and (g) N = 70 B). Thus, for models in the DeepSeek-R1-Distill family, the probability of correctly solving an instance decays exponentially with instance size n, while capability, measured by the decay scale ντ (N ), grows sublinearly with model size N .

log predictive density (elpd FAM ≈ − 199) than the VAM (elpd VAM ≈ − 212) and is therefore favored by this crite-rion. Our fits suggest that the scale of the exponential decay increases from E[νN,τ | D ] ≈ 26 .4 for the smallest LRM, with N = 1 .5 B parameters, to E[νN,τ | D ] ≈ 363 .5for the largest LRM, with N = 70 B parameters. This provides a rough estimate of the size of an addition in-stance that an LRM can typically solve. Across tasks and temperatures, we find that the pos-terior means of the scaling exponent β(ν) 

> τ

indicate a sub-linear scaling of the performance decay parameter ντ (N )with the number of LRM parameters N , irrespective of whether the FAM (Fig. 3 (a) ) or the VAM (Fig. 3 (b) )is used. We indicate which model has the higher es-timated elpd using the ⋄ symbol and provide detailed model-comparison results in Appendix C. For the addition task, the posterior means of the scal-ing exponent β(ν) 

> τ

vary little across temperatures, and the corresponding posterior distributions are narrowly con-centrated. Although the FAM has a higher elpd than the VAM across temperatures, our qualitative conclu-sions are unchanged by the choice of statistical model. For the brackets task, the posterior means E[β(ν) 

> τ

| D ]are higher under the FAM than under the VAM across temperatures τ . Nevertheless, both statistical models are compatible with the capability scale increasing sub-linearly with N . The VAM has a higher estimated elpd than the FAM because it accommodates model-size-dependent asymptotes. For larger LRMs, the inferred large-n asymptote Rp (∞) 

> N,τ

is close to the random-guessing expectation of R 

> 2

= 50 correctly solved instances, whereas for smaller LRMs, it is close to zero because they often fail to provide an answer (see Appendix B 1). For the index task, both statistical models yield sim-ilar posterior means E[β(ν) 

> τ

| D] across temperatures. These posterior means lie between 0 and 1, indicating sublinear scaling of the characteristic decay scale ντ (N )with the LRM parameter count N . The FAM has a slightly higher estimated elpd than the VAM. For the parity task, the more flexible VAM has a higher estimated elpd than the FAM. Under both sta-tistical models, the posterior means E[β(ν) 

> τ

| D ] lie be-tween 0 and 1, indicating sublinear scaling, but they are lower under the VAM than under the FAM. Within each statistical model, the posterior means vary little across temperatures τ .Together, these findings suggest that larger models in the DeepSeek-R1-Distill family are able to solve larger instances of our four reasoning tasks. Across all experi-ments, the posterior means of the capability-scaling ex-B Capability 60.4 0.6 0.8 0.4 0.6 0.8 0.4 0.6 0.8 0.4 0.6 0.8                                       

> −1012
> β(ν)
> τ
> (a) FAM
> addition
> τ=
> brackets
> τ=
> index
> τ=
> parity
> τ=
> 0.4 0.6 0.8 0.4 0.6 0.8 0.4 0.6 0.8 0.4 0.6 0.8
> −1012
> β(ν)
> τ
> (b) VAM
> addition
> τ=
> brackets
> τ=
> index
> τ=
> parity
> τ=
> FIG. 3. Capability comparison. Comparing the posterior distributions of the scaling exponent β(ν)
> τacross statistical models ( (a) FAM, (b) VAM), tasks ( addition (red), brackets (blue), index (green), and parity (yellow)), and temperatures (shades), we find that all posterior distributions place most of their mass on positive values of β(ν)
> τlower than one and therefore favor sublinear scaling across experimental conditions and statistical models. Note that the statistical model with the higher estimated elpd varies across conditions, as indicated by ⋄.

ponent satisfy 0 < E[β(ν) 

> τ

| D ] < 1, indicating sublinear growth of the decay scale ντ (N ) with model size N at the level of the posterior means.  

> C. Efficiency

Figure 4 illustrates how we evaluate the scaling of model efficiency with the number of parameters N us-ing the PM for the index task and temperature τ = 0 .6. Results for the remaining temperatures ( τ ∈ { 0.4, 0.8})and other tasks can be found in Appendix B 2. For the index task, we find that the inferred scaling of model efficiency, quantified by the prefactor AN,τ in Eq. (8), with model parameter count N is approximately flat (Fig. 4 (a) ). The model attributes deviations from the largely flat latent scaling curve Aτ (N ) to a log-scale random effect with posterior mean standard deviation 

E[η(A) 

> τ

| D ] ≈ 0.42. The posterior mean of the scaling exponent β(A) 

> τ

is E[β(A) 

> τ

| D ] ≈ − 0.03, and its 95% cred-ible interval straddles zero, CrI 95% [β(A) 

> τ

] ≈ (−0.32 , 0.25) (Fig. 4 (b) ). At fixed model sizes N on the index task (Fig. 4 (c) –

(g) ), the PM captures the increase in average output length ¯ℓN,n,τ with instance size n. The inferred scaling is sublinear, with posterior means E[αN,τ | D ] ranging from 0 .52 to 0 .57. This implies that doubling the instance size increases average output length by a factor between 20.52 ≈ 1.43 and 2 0.57 ≈ 1.48. Across tasks, statistical models, and temperatures, we do not find strong evidence that the prefactor AN,τ 

in Eq. (8) decreases systematically with model size, as would be expected if larger models were more efficient (Fig. 5). We indicate the statistical model with the higher estimated elpd using the ⋄ symbol and provide further details on model comparison in Appendix C. For the addition task (Fig. 5), both the PM and the PEM yield posterior distributions of β(A) 

> τ

that are cen-tered around zero. The PEM achieves higher elpd at all temperatures and is thus favored in model comparison. For the brackets task (Fig. 5), we find that results differ by temperature τ but are consistent between sta-tistical models. At temperatures τ ∈ { 0.4, 0.6}, both the PM and the PEM put most of the posterior mass on small positive values of β(A) 

> τ

, indicating that models at these temperatures become less efficient as model size in-creases, but this effect is weak. At temperature τ = 0 .8, in contrast, the posterior covers zero. For the brackets 

task, the PM is preferred in model comparison. For the index task (Fig. 5), the PM offers a better fit than the PEM at temperatures τ ∈ { 0.4, 0.6} but not at temperature τ = 0 .8. Both statistical models provide no strong evidence that efficiency scales with model size. For the parity task (Fig. 5), although the posterior distribution of β(A) 

> τ

covers zero under both statistical models, more posterior mass lies on small negative val-ues. This is compatible with weak efficiency gains as the number of parameters N increases. Model comparison C Efficiency 7                                              

> FIG. 4. Efficiency scaling. Fitting the PM to data from the index task at temperature τ= 0 .6 suggests that (a) the prefactor AN,τ of the length scaling (orange circles) approximately follows an almost flat latent scaling law Aτ(N) (teal line).
> (b) The posterior of the latent scaling exponent β(A)
> τis concentrated around zero, E[β(A)
> τ| D ]≈ − 0.03 (black dashed line). A scaling ansatz with prefactors AN,τ that vary systematically with model size Nand exponents αN,τ that vary only through random effects (red line) offers a good fit to the observed output lengths ¯ℓN,n,τ (yellow circles) as a function of the instance size nacross model sizes N((c) N= 1 .5 B, (d) N= 7 B, (e) N= 14 B, (f ) N= 32 B, (g) N= 70 B). These results suggest that while output length approximately increases as a power law in the instance size, the model efficiency, measured by the prefactor of this power law, does not scale substantially with model size N.

favors the PM over the PEM at all temperatures. Together, these results paint a nuanced picture of effi-ciency scaling in LRMs from the DeepSeek-R1-Distill 

family. For most task and temperature combinations, ef-ficiency does not increase with model size. In some cases, increases or decreases in efficiency might be present, but any such effect is weak.  

> III. DISCUSSION

In this paper, we asked whether larger models become more capable and more efficient at solving arithmetic and algorithmic reasoning problems. We find that models be-come more capable, i.e., larger models can solve harder problems. However, we do not find evidence that they are more efficient, i.e., correct solutions produced by larger models are not systematically shorter than those pro-duced by smaller models. These findings have implications for model design, as they call into question the na¨ ıve scaling approach to ar-tificial intelligence. While we find that larger models are more capable, the scaling laws we infer are sublinear. This means that scaling the number of parameters comes with diminishing returns. Every additional parameter translates into a smaller increase in the decay scale νN,τ 

than the previous parameter added. One potential expla-nation is that model resources that are relevant for inte-grating information across larger problem instances, e.g., a model’s width or depth, grow sublinearly in the number of parameters. Another possible explanation is that solv-ing large problem instances draws on multiple abilities of the model, e.g., the ability to generalize across instance sizes or to produce CoTs longer than those present in the training data. Capability scaling could then be effectively limited by the ability that increases most slowly. Moreover, we find no strong evidence that models be-come more efficient. This means that upfront invest-ment in parameter budget during pretraining does not translate into systematically shorter answers. This find-ing could impact how quickly pretraining cost can be amortized. One potential explanation for this observa-tion is that algorithmically solving a problem requires executing a given number of operations, as specified by its time complexity. This fundamentally limits possible efficiency gains. Another explanation could be that to-ken efficiency, in contrast to correctness, is not explicitly rewarded under current post-training paradigms. We also contribute to the ongoing debate on what mea-suring model capability and efficiency should mean. In this work, we view both capability and efficiency as latent properties of a model. This means that these properties are not directly observable and must be inferred from behavioral data. A Reasoning Models and Sampling 80.4 0.6 0.8 0.4 0.6 0.8 0.4 0.6 0.8 0.4 0.6 0.8                                       

> −1012
> β(A)
> τ
> (a) PM
> addition
> τ=
> brackets
> τ=
> index
> τ=
> parity
> τ=
> 0.4 0.6 0.8 0.4 0.6 0.8 0.4 0.6 0.8 0.4 0.6 0.8
> −1012
> β(A)
> τ
> (b) PEM
> addition
> τ=
> brackets
> τ=
> index
> τ=
> parity
> τ=
> FIG. 5. Efficiency comparison. Comparing the posterior distributions of the scaling exponent β(A)
> τacross statistical models ((a) PM, (b) PEM), tasks ( addition (red), brackets (blue), index (green), parity (yellow)), and temperatures (shades), provides no strong evidence for scaling of efficiency with the number of model parameters N. The posterior distributions are centered close to zero in most cases. Our findings are consistent across statistical models, even if different combinations of task and temperature favor different models in terms of elpd, as indicated by ⋄.

Our work is not without limitations, and addressing them directly points to opportunities for future work. First, studying well our findings generalize beyond the 

DeepSeek-R1-Distill model family and our four reason-ing tasks is an important open question. This could also address potential confounding introduced by distilling the DeepSeek-R1 architecture into different base models with different tokenizers. Second, our evaluation assesses capability and efficiency separately. Studying their inter-play and potential latent couplings between them could uncover capability-efficiency trade-offs, elucidate the role of correctness-conditioning on efficiency, and, in the long run, aid the design of Pareto-optimal models. Finally, our statistical models are agnostic to the origin of ca-pability and efficiency. Designing statistical procedures that decompose capability and efficiency gains along the model life cycle could guide resource-optimal training and deployment.   

> IV. METHODS A. Reasoning Models and Sampling

We use the following models from the 

DeepSeek-R1-Distill model family [8]: 

• DeepSeek-R1-Distill-Qwen-1.5B 

• DeepSeek-R1-Distill-Qwen-7B 

• DeepSeek-R1-Distill-Qwen-14B 

• DeepSeek-R1-Distill-Qwen-32B 

• DeepSeek-R1-Distill-Llama-70B 

These models range from N = 1 .5 B to N = 70 B parameters and are obtained via distillation of the full 

DeepSeek-R1 model with N = 671 B parameters into smaller Qwen or Llama models. We use temperature sampling with temperature τ ∈ { 0.4, 0.6, 0.8} in all our experiments with τ = 0 .6 being the recommended tem-perature for deployment. If the end-of-sequence token is not emitted after 75 ,000 sampled tokens, we stop the generation process. We leverage the SGLang library [65] (Apache 2.0 Li-cense) for continuous batching as well as parallelization across NVIDIA H200 and H100 GPUs.  

> B. Reasoning Tasks

Here, we describe the four reasoning tasks in more de-tail, including how random instances are constructed and how the correct answer is computed. We also comment on the time, space, and BAPO complexity of each task. An overview can be found in Tab. I.  

> 1. Addition

A size-n instance of the addition task consists of a multiset of integers X of size n. In our experiments, B Reasoning Tasks 9                               

> Task BAPO complexity Time complexity Space complexity Example Prompt
> addition BAPO -hard (conjectured) Θ( n)O(1)
> Add the following numbers: 1, 21, 40, 12. \n Give your final answer within \boxed {}\ n <think> brackets BAPO -hard (conjectured) Θ( n)O(n)
> Check whether the brackets are properly closed and nested in the following string: (() {[] }[]). \n Answer only with True or False. Give your final answer within \boxed {} .\n <think> parity BAPO -easy Θ( n)O(1)
> Determine the parity of the following binary string: 1010110. \n Respond with even or odd. Give your final answer within
> \boxed {} .\n <think> index BAPO -easy O(1) to O(n)O(1)
> What is the element at position 3
> in the sequence 10, 2, 11, 20? \n Respond with the element. Use zero-based indexing. Give your final answer within \boxed {} .
> \n <think>
> TABLE I. Reasoning tasks. Overview of our four reasoning tasks ( addition ,brackets ,parity , and index ) including their conjectured BAPO complexity, time complexity, and space complexity, as well as an example prompt for each task.

we construct random instances of the addition task by drawing the elements of X uniformly at random with replacement from {0, 1, . . . , 100 }.The correct answer a is computed by summing all ele-ments of X ,

a = X

> x∈X

x. (12) Assuming that two integers can be added in O(1) time, and that storing an integer requires O(1) space, an algo-rithm that maintains the running sum S and adds num-bers one by one has runtime Θ( n) and requires O(1) space for the variable S. As adding n numbers requires touch-ing each number at least once, there is no faster sequen-tial algorithm. Neither Schnabel et al. [63] nor Tomlinson et al. [64] establish BAPO complexity for addition . However, they establish that the majority task, which consists of de-ciding whether the number of “1” symbols in a binary string is larger than the number of “0” symbols, is BAPO -hard. We conjecture that a constant bandwidth BAPO for solving addition of integers from {0, 1} could be used to solve majority . If this conjecture is true, no such BAPO 

can exist without contradicting Theorem 4 of Schnabel et al. [63]. Thus, provided the conjecture holds, addition 

is BAPO -hard.  

> 2. Brackets

To solve a size-n instance of the brackets task, the model needs to decide whether a sequence x =(x0, . . . , x n−1) of n brackets is “properly nested”. We use three types of opening brackets, {(, {, [} and corre-sponding closing brackets {), }, ]}. While the meaning of “properly nested” can be grasped intuitively, it can be made more rigorous. We call a sequence “properly nested” if it can be generated by the context-free gram-mar with the following production rule, 

x → ε | xx | (x) | { x} | [x], (13) where x is a non-terminal symbol, ε denotes the empty sequence, | separates different production rules, and jux-taposition of two symbols denotes concatenation. Equiv-alently, we could say that the string is an element of the Dyck language with three bracket types [66, 67]. Algorithm 1 provides pseudocode for the procedure that we use to create random sequences of brackets that are, in expectation, properly nested in 50% of cases. We use U S to denote the uniform distribution on the set 

S, and make use of the function get closing that asso-ciates with an opening bracket the closing bracket of the same type. Throughout, we use the convention that the method pop returns the empty sequence ε if called on an empty stack. We set the probability popen = 0 .6, slightly favoring deeply nested sequences over ones in which open-ing and closing brackets alternate, and we set the prob-ability pfalse = 0 .5, thereby obtaining an approximately balanced dataset of sequences of properly and improperly nested brackets. While creating improperly nested se-quences by deleting a bracket means that these instances contain only n − 1 brackets, thus creating a potential shortcut, we provide evidence in Appendix D that mod-els are not exploiting this shortcut. We record during sequence generation whether the sequence is or is not properly nested as the binary correct answer a.A similar stack-based algorithm exists for deciding whether a given sequence x of brackets is properly nested. We provide pseudocode in Algorithm 2. This algorithm has time complexity O(n) and uses, in the worst case, 

O(n) space for the stack. B Reasoning Tasks 10 

Algorithm 1: Generate brackets sequence                                                            

> Data: n(even)
> Result: x ,a∈ { 0,1}
> nopen ←0;
> nclosed ←0;
> x←init list ();
> s←init stack ();
> while nclosed <n
> 2do
> r∼U[0 ,1];
> if nopen <n
> 2∧(r < p open ∨s=∅)then
> o∼U{(,{,[};
> x.append( o);
> c←get closing (o);
> s.push( c);
> nopen ←nopen + 1;
> else
> c←s.pop();
> x.append( c);
> nclosed ←nclosed + 1;
> end end
> r∼U[0 ,1];
> a←1;
> if r < p false then
> i∼U{0, . . . , n −1};
> x←x.delete( i);
> a←0;
> end

Prior work [63, 64] does not establish BAPO complexity for brackets . We conjecture that brackets is BAPO -hard, but rigorously establishing this is beyond the scope of this paper.  

> 3. Parity

A size-n instance of the parity task consists of a bi-nary string x of length n. We generate random instances of this task by drawing each element of the string uni-formly at random from {0, 1}. The correct answer a can be computed using addition modulo 2, 

a = X

> x∈x

x

!

mod 2 . (14) An efficient algorithm for this task maintains a parity bit and sequentially updates the parity value as the sequence 

x is traversed. Such an algorithm uses O(1) space for the parity bit and has time complexity Θ( n), assuming that the parity bit can be updated in O(1) time. As each bit needs to be touched exactly once, no faster sequential algorithm exists. In contrast to the addition task, the parity task is 

BAPO -easy, as shown in Example A.1 of Tomlinson et al. [64]. 

Algorithm 2: Check brackets sequence                                              

> Data: x Result: a∈ { 0,1}
> n←len (x);
> s←init stack ();
> i←0;
> z←1;
> while i < n do if xi∈ { (,{,[}then
> c←get closing (xi);
> s.push( c);
> else
> c←s.pop();
> if c̸=xi∨c=εthen
> z←0;
> break ;
> end end
> i←i+ 1;
> end if s =∅ ∧ z̸= 0 then
> a←1;
> else
> a←0;
> end
> 4. Index

A size-n instance of the index task consists of a length-

n sequence x of integers and an additional integer i sat-isfying 0 ≤ i < n . We generate random instances of this task by sampling the elements of x uniformly at random with replacement from {0, 1, . . . , 100 } and sampling i uni-formly at random from {0, 1, . . . , n − 1}. We determine the correct answer a = xi via lookup. As the elements of the sequence are of bounded size, this task can be solved using O(1) space. The time com-plexity depends on the type of data structure that stores the sequence and ranges (for reasonable choices) from 

O(1) look-up for an array to O(n) traversal for a linked list. Example A.2 of Tomlinson et al. [64] establishes that 

index is BAPO -easy.  

> C. Extracting Answers

Here, we describe how we extract the answer ˆ aN,n,τ,r 

that a model of size N provides for problem instance r

of size n at temperature τ from the output of the model. We use the term “output” to refer to all tokens generated after the <think> token including the CoT. To extract the model answer, we first verify that the CoT was completed, i.e., that the model output contains the token </think> . If the CoT was not completed, we count the instance as incorrectly answered. In the notation of Eq. (1), this can be represented by setting ˆaN,n,τ,r = NaN , where NaN is a dummy value that does D Statistical Models 11 not equal any number. We only consider the part of the output following the CoT, i.e., after the </think> token when extracting the answer. As the example prompts in Tab. I show, we instruct models to enclose their final answers in \boxed {} . When inspecting the model output, we observe that models obey this instruction in many cases but occasionally use 

\boxed {\ text {}} to enclose answers. We thus use reg-ular expressions to extract possible answers enclosed by either \boxed {} or \boxed {\ text {}} . The exact regu-lar expression depends on the task. We permit arbitrary whitespace between the enclosing brackets and the an-swer, and consider the first matching substring as the model’s answer. For the addition and index tasks we match any in-teger and account for possible digit-grouping commas, i.e., both 1000 and 1,000 will be recognized as valid an-swers. For the brackets task, we match True or False 

using case-insensitive matching. Finally, for the parity 

task, we match even or odd , again, using case-insensitive matching. 

D. Statistical Models 

1. Variable Asymptote Model 

Here, we provide the full formulation of the variable asymptote model (VAM), including all priors and hyper-priors. We use the binomial likelihood for the observed num-ber of instances yN,n,τ of size n that a model of size N

solves correctly at temperature τ out of R total problem instances, 

yN,n,τ ∼ Binom ( R, p N,τ (n)) . (15) The function pN,τ (n) is given in Eq. (6) and requires us to specify the parameters p(0)  

> τ

, p(∞) 

> N,τ

, and νN,τ .To ensure p(0)  

> τ

and p(∞) 

> N,τ

are confined to the interval [0 , 1], we parameterize 

κ(0)  

> τ

∼ N (1 .5, 1.0) 

κ(∆)  

> N,τ

∼ N (1 .5, 1.0) 

p(0)  

> τ

= σ



κ(0) 

> τ



p(∞) 

> N,τ

= p(0)  

> τ

σ



κ(∆) 

> N,τ



,

(16) where σ is the sigmoid function, σ(x) = 11+ e−x , and 

N (˜ μ, ˜σ) denotes the normal distribution with mean ˜ μ

and standard deviation ˜ σ.The model capability parameter νN,τ is defined through the latent scaling relationship in Eq. (7) that de-pends on the parameters C(ν) 

> τ

, β(ν) 

> τ

, η(ν) 

> τ

, and the noise term ξ(ν) 

> N,τ

. We use the following priors log C(ν) 

> τ

∼ N (log 50 , 1) 

β(ν) 

> τ

∼ N (0 , 1) log η(ν) 

> τ

∼ N (log 0 .3, 1) 

ξ(ν) 

> N,τ

∼ N (0 , 1) (17) where sampling on a logarithmic scale is employed to ensure that the prefactor C(ν) 

> τ

and noise magnitude η(ν)

> τ

are positive. 

2. Fixed Asymptote Model 

The fixed asymptote model (FAM) uses the same pri-ors as the VAM, with one modification that prevents p(∞)

> N,τ

from varying with N .Instead of sampling p(∞) 

> N,τ

independently for each value of N at a fixed temperature τ as in Eq. (16), we sample one parameter p(∞) 

> τ

per value of the temperature τ with prior 

κ(∆)  

> τ

∼ N (1 .5, 1.0) 

p(∞) 

> τ

= p(0)  

> τ

σ



κ(∆) 

> τ



. (18) The analogue of the exponential decay Eq. (6) is 

pN,τ (n) = p(∞) 

> τ

+



p(0)  

> τ

− p(∞)

> τ



exp 



− nνN,τ 



. (19) The parametric assumptions on νN,τ are identical in both models. 

3. Prefactor Exponent Model 

The prefactor exponent model (PEM) describes the average output length ¯ℓN,n,τ (Eq. (3)) of a correct answer using a Gaussian likelihood for the logarithm, log ¯ℓN,n,τ ∼ N (log λN,n,τ , ω N,n,τ ) , (20) where λN,n,τ and ωN,n,τ are given by Eq. (8) and Eq. (9), respectively. The latter contains the parameter ζτ for which we use a half-normal prior 

ζτ ∼ HalfNorm(0 .5) . (21) The former, Eq. (8), depends on the parameters AN,τ 

and αN,τ that are specified by the latent scaling relation-ships in Eq. (10) and Eq. (11), respectively. We need to specify priors for all parameters in these equations, i.e., for the prefactors C(A) 

> τ

, C(α) 

> τ

,log C(A) 

> τ

∼ N (log 10 4, 0.75) log C(α) 

> τ

∼ N (log 0 .75 , 0.35) (22) 12 the scaling exponents β(A) 

> τ

, β(α) 

> τ

,

β(A) 

> τ

∼ N (0 , 0.5) 

β(α) 

> τ

∼ N (0 , 0.5) (23) and the noise terms η(A) 

> τ

ξ(A) 

> N,τ

, η(α) 

> τ

ξ(α) 

> N,τ

have priors 

η(A) 

> τ

∼ HalfNorm(0 .25) 

η(α) 

> τ

∼ HalfNorm(0 .25) 

ξ(A) 

> N,τ

∼ N (0 , 1) 

ξ(α) 

> N,τ

∼ N (0 , 1) .

(24) 

4. Prefactor Model 

The prefactor model (PM) uses the same priors as the PEM but does not include latent scaling of the exponent, 

αN,τ . Thus, Eq. (11) simplifies to log αN,τ = log C(α) 

> τ

+ η(α) 

> τ

ξ(α) 

> N,τ

, (25) and all variation across different values of N is due to the random effect term. As β(α) 

> τ

does not appear in Eq. (25), we can omit the relevant prior in Eq. (23). 

E. HMC Hyperparameters and Diagnostics 

To infer the parameters of our statistical models, we perform Hamiltonian Monte Carlo (HMC) sampling us-ing the No-U-Turn Sampler (NUTS) implemented in the 

NumPyro library [68, 69]. We run six independent chains, each with 1 ,000 warm-up iterations and 5 ,000 post-warm-up samples. We use a target acceptance probability of 0.99 and a maximum tree depth of 20, and otherwise use the default configuration. When fitting the FAM, VAM, PM, and PEM on the full dataset results we encountered no divergences and found ˆR < 1.01 throughout. To assess out-of-sample predictive performance, we es-timate the leave-one-out expected log predictive density (elpd). At each temperature τ , we leave out one com-bination of model size N and instance size n, refit the statistical model to the remaining data, and evaluate its predictive density on the held-out configuration. When comparing the FAM and VAM, we did not en-counter divergences and found ˆR < 1.01 for all fits. We also did not encounter any divergences and found ˆR < 1.01 for all fits of the PM and PEM. 

V. CODE AVAILABILITY 

We make code for generating reasoning traces, as well as for our statistical analysis avail-able at https://github.com/zohairshafi/ capability-efficiency-scaling .

VI. ACKNOWLEDGMENTS 

M.L. and T.E.R. are supported by the Inaugural Joseph E. Aoun Endowment. We thank Modal Labs, Inc. for providing compute resources for this project. 

VII. AI USE 

We used the following AI assistants for proofreading the manuscript: OpenAI’s GPT-5.5-Sol and GPT-5.6-Sol and GPT-6-Astra and Anthropic’s Fable 5 and Fable 5.1. We used OpenAI’s GPT-5.6-Sol to aide in math-ematical derivations, which we verified. We used Ope-nAI’s GPT-5.6-Sol and DeepSeek AI’s DeepSeek-v4-Pro with Anthropic’s Claude Code harness in the software de-velopment process. We validated the all code to ensure correctness. 

REFERENCES 

[1] Kaplan, J. et al. Scaling Laws for Neural Language Mod-els. arXiv:2001.08361 (2020). [2] Hoffmann, J. et al. Training compute-optimal large lan-guage models. In Proceedings of the 36th International Conference on Neural Information Processing Systems ,NIPS ’22, 30016–30030 (Curran Associates Inc., Red Hook, NY, USA, 2022). [3] Snell, C. V., Lee, J., Xu, K. & Kumar, A. Scaling LLM Test-Time Compute Optimally Can be More Effective than Scaling Parameters for Reasoning. In The Thir-teenth International Conference on Learning Represen-tations (2024). [4] Lai, H. et al. A Survey of Post-Training Scaling in Large Language Models. In Che, W., Nabende, J., Shutova, E. & Pilehvar, M. T. (eds.) Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers) , 2771–2791 (Association for Computational Linguistics, Vienna, Austria, 2025). [5] Wei, J. et al. Emergent Abilities of Large Language Mod-els. Transactions on Machine Learning Research (2022). [6] Schaeffer, R., Miranda, B. & Koyejo, S. Are emergent abilities of large language models a mirage? In Oh, A. 

et al. (eds.) Advances in Neural Information Processing Systems , vol. 36, 55565–55581 (Curran Associates, Inc., 2023). [7] Ganguli, D. et al. Predictability and Surprise in Large Generative Models. In Proceedings of the 2022 ACM Conference on Fairness, Accountability, and Trans-parency , FAccT ’22, 1747–1764 (Association for Comput-ing Machinery, New York, NY, USA, 2022). [8] Guo, D. et al. DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning. Nature 645 , 633– 638. doi:10.1038/s41586-025-09422-z (2025). [9] OpenAI et al. OpenAI o1 System Card. arXiv:2412.16720 (2024). [10] Kimi Team et al. Kimi k1.5: Scaling Reinforcement Learning with LLMs. arXiv:2501.12599 (2025). 13 

[11] Zhang, Q. et al. A Survey on Test-Time Scaling in Large Language Models: What, How, Where, and How Well? arXiv:2503.24235 (2025). [12] Hestness, J. et al. Deep Learning Scaling is Predictable, Empirically. arXiv:1712.00409 (2017). [13] Sharma, U. & Kaplan, J. Scaling Laws from the Data Manifold Dimension. Journal of Machine Learning Re-search 23 , 1–34 (2022). [14] Bahri, Y., Dyer, E., Kaplan, J., Lee, J. & Sharma, U. Explaining neural scaling laws. Proceedings of the Na-tional Academy of Sciences 121 , e2311878121. doi:10. 1073/pnas.2311878121 (2024). [15] Bordelon, B., Atanasov, A. & Pehlevan, C. A Dynamical Model of Neural Scaling Laws. In Forty-First Interna-tional Conference on Machine Learning (2024). [16] Caballero, E., Gupta, K., Rish, I. & Krueger, D. Bro-ken Neural Scaling Laws. In The Eleventh International Conference on Learning Representations (2022). [17] Sorscher, B., Geirhos, R., Shekhar, S., Ganguli, S. & Morcos, A. S. Beyond neural scaling laws: Beating power law scaling via data pruning. In Advances in Neural In-formation Processing Systems (2022). [18] Wei, J. et al. Finetuned Language Models are Zero-Shot Learners. In International Conference on Learning Rep-resentations (2021). [19] Ouyang, L. et al. Training language models to follow instructions with human feedback. In Advances in Neu-ral Information Processing Systems , vol. 35, 27730–27744 (Curran Associates, Inc., 2022). [20] Zhang, S. et al. Instruction Tuning for Large Language Models: A Survey. ACM Computing Surveys 58 , 169:1– 169:36. doi:10.1145/3777411 (2026). [21] Christiano, P. F. et al. Deep Reinforcement Learning from Human Preferences. In Advances in Neural Infor-mation Processing Systems , vol. 30 (Curran Associates, Inc., 2017). [22] Ziegler, D. M. et al. Fine-Tuning Language Models from Human Preferences. arXiv:1909.08593 (2020). [23] Lambert, N. Reinforcement Learning from Human Feed-back. arXiv:2504.12501 (2026). [24] Cobbe, K. et al. Training Verifiers to Solve Math Word Problems. arXiv:2110.14168 (2021). [25] Lambert, N. et al. Tulu 3: Pushing Frontiers in Open Language Model Post-Training. arXiv:2411.15124 (2025). [26] Zhang, K. et al. A Survey of Reinforcement Learning for Large Reasoning Models. arXiv:2509.08827 (2025). [27] Zhou, C. et al. LIMA: Less Is More for Alignment. 

Advances in Neural Information Processing Systems 36 ,55006–55021 (2023). [28] Chung, H. W. et al. Scaling Instruction-Finetuned Lan-guage Models. Journal of Machine Learning Research 

25 , 1–53 (2024). [29] Zhang, B., Liu, Z., Cherry, C. & Firat, O. When Scaling Meets LLM Finetuning: The Effect of Data, Model and Finetuning Method. International Conference on Learn-ing Representations 2024 , 44694–44713 (2024). [30] Lin, H. et al. Selecting Large Language Model to Fine-tune via Rectified Scaling Law. In Proceedings of the 41st International Conference on Machine Learning , 30080– 30107 (PMLR, 2024). [31] Gao, L., Schulman, J. & Hilton, J. Scaling Laws for Re-ward Model Overoptimization. In Proceedings of the 40th International Conference on Machine Learning , 10835– 10866 (PMLR, 2023). [32] Hou, Z. et al. Does RLHF Scale? Exploring the Im-pacts From Data, Model, and Method. arXiv:2412.06000 (2024). [33] Bai, Y. et al. Constitutional AI: Harmlessness from AI Feedback. arXiv:2212.08073 (2022). [34] Lee, H. et al. RLAIF vs. RLHF: Scaling Reinforcement Learning from Human Feedback with AI Feedback. In 

Forty-First International Conference on Machine Learn-ing (2024). [35] Yue, Y. et al. Does Reinforcement Learning Really In-centivize Reasoning Capacity in LLMs Beyond the Base Model? In The Thirty-ninth Annual Conference on Neu-ral Information Processing Systems (2025). [36] Wang, J. et al. Beyond Accuracy: Dissecting Mathemat-ical Reasoning for LLMs Under Reinforcement Learning. In The Thirty-ninth Annual Conference on Neural Infor-mation Processing Systems (2025). [37] Devvrit, F. et al. The Art of Scaling Reinforcement Learning Compute for LLMs. In The Fourteenth Interna-tional Conference on Learning Representations (2025). [38] Cheng, Z. et al. IsoCompute Playbook: Optimally Scal-ing Sampling Compute for LLM RL. In The 1st Work-shop on Scaling Post-training for LLMs at ICLR 2026 

(2026). [39] Tan, Z. et al. Scaling Behaviors of LLM Reinforcement Learning Post-Training: An Empirical Study in Math-ematical Reasoning. In Liakata, M., Moreira, V. P., Zhang, J. & Jurgens, D. (eds.) Proceedings of the 64th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers) , 31300–31319 (As-sociation for Computational Linguistics, San Diego, Cal-ifornia, United States, 2026). [40] Wang, Y. et al. Reinforcement Learning for Reasoning in Large Language Models with One Training Example. In The Thirty-ninth Annual Conference on Neural Infor-mation Processing Systems (2025). [41] Mitsuhashi, R., Chen, P., Tseng, I., Cekinmez, J. & Wu, A. J. Quantifying Empirical Compute-Supervision Tradeoffs in RLVR. In ICML 2026 Workshop on Combin-ing Theory and Benchmarks: Towards A Virtuous Cycle to Understand and Guarantee Foundation Model Perfor-mance (2026). [42] Wu, M. et al. Reasoning or Memorization? Unreliable Results of Reinforcement Learning Due to Data Contami-nation. Proceedings of the AAAI Conference on Artificial Intelligence 40 , 33944–33952. doi:10.1609/aaai.v40i40. 40687 (2026). [43] Feng, Y., Kempe, J., Zhang, C., Jain, P. & Hartshorn, A. What Characterizes Effective Reasoning? Revisiting Length, Review, and Structure of CoT. In NeurIPS 2025 Workshop on Efficient Reasoning (2025). [44] Wu, Y. et al. When More is Less: Understanding Chain-of-Thought Length in LLMs. In The Fourteenth Interna-tional Conference on Learning Representations (2025). [45] Gema, A. P. et al. Inverse Scaling in Test-Time Compute. 

Transactions on Machine Learning Research (2025). [46] Yang, W., Ma, S., Lin, Y. & Wei, F. Towards Thinking-Optimal Scaling of Test-Time Compute for LLM Reason-ing. In The Thirty-ninth Annual Conference on Neural Information Processing Systems (2025). [47] Chen, X. et al. Do NOT Think That Much for 2+3=? On the Overthinking of Long Reasoning Models. In Forty-Second International Conference on Machine Learning 14 

(2025). [48] Wang, Y. et al. Thoughts Are All Over the Place: On the Underthinking of Long Reasoning Models. In The Thirty-ninth Annual Conference on Neural Information Processing Systems (2025). [49] Opedal, A. et al. Are Language Models Efficient Rea-soners? A Perspective from Logic Programming. In The Thirty-ninth Annual Conference on Neural Information Processing Systems (2025). [50] Dang, R., Li, Z., Huang, S. & Chen, J. The First Im-pression Problem: Internal Bias Triggers Overthinking in Reasoning Models. In The Fourteenth International Conference on Learning Representations (2025). [51] Su, J., Healey, J., Nakov, P. & Cardie, C. Be-tween Underthinking and Overthinking: An Empirical Study of Reasoning Length and Correctness in LLMs. arXiv:2505.00127 (2025). [52] Mirtaheri, P., Edelman, E., Jelassi, S., Malach, E. & Boix-Adser` a, E. Let Me Think! A Long Chain of Thought Can Be Worth Exponentially Many Short Ones. In The Thirty-ninth Annual Conference on Neural Infor-mation Processing Systems (2025). [53] Gu, X., De, S., Markeeva, L., Veliˇ ckovi´ c, P. & Pascanu, R. Understanding Performance Gap Between Parallel and Sequential Sampling in Large Reasoning Models. arXiv:2604.05868 (2026). [54] Mirzadeh, S. I. et al. GSM-Symbolic: Understanding the Limitations of Mathematical Reasoning in Large Lan-guage Models. In The Thirteenth International Confer-ence on Learning Representations (2024). [55] Shojaee, P. et al. The Illusion of Thinking: Understand-ing the Strengths and Limitations of Reasoning Models via the Lens of Problem Complexity. In The Thirty-ninth Annual Conference on Neural Information Process-ing Systems (2025). [56] Bie, A. et al. AI-rithmetic. In I Can’t Believe It’s Not Better Workshop at ICLR 2026 (2026). [57] Zhou, Y., Liu, H., Chen, Z., Tian, Y. & Chen, B. GSM-

∞: How Do Your LLMs Behave over Infinitely Increas-ing Reasoning Complexity. In Forty-Second International Conference on Machine Learning (2025). [58] Zhang, J. et al. When Reasoning Meets Its Laws. In 

NeurIPS 2025 Workshop on Efficient Reasoning (2025). [59] Lin, B. Y. et al. ZebraLogic: On the Scaling Limits of LLMs for Logical Reasoning. In Forty-Second Interna-tional Conference on Machine Learning (2025). [60] Du, Z., Kang, H., Han, S., Krishna, T. & Zhu, L. Ock-Bench: Tokens are Not to Be Multiplied without Neces-sity. In NeurIPS 2025 Workshop on Efficient Reasoning 

(2025). [61] Shi, J. et al. KORGym: A Dynamic Game Platform for LLM Reasoning Evaluation. In The Thirty-ninth An-nual Conference on Neural Information Processing Sys-tems (2025). [62] Chen, J. et al. Enigmata: Scaling Logical Reasoning in Large Language Models with Synthetic Verifiable Puz-zles. In The Thirty-ninth Annual Conference on Neural Information Processing Systems (2025). [63] Schnabel, T., Tomlinson, K., Swaminathan, A. & Neville, J. Lost in Transmission: When and Why LLMs Fail to Reason Globally. In The Thirty-ninth Annual Conference on Neural Information Processing Systems (2025). [64] Tomlinson, K., Schnabel, T., Swaminathan, A. & Neville, J. Reasoning about Reasoning: BAPO Bounds on Chain-of-Thought Token Complexity in LLMs. In Forty-Third International Conference on Machine Learning (2026). [65] Zheng, L. et al. SGLang: Efficient Execution of Struc-tured Language Model Programs. In Advances in Neu-ral Information Processing Systems , vol. 37, 62557–62583 (Curran Associates, Inc., 2024). [66] Autebert, J.-M., Berstel, J. & Boasson, L. Context-free languages and pushdown automata. In Rozenberg, G. & Salomaa, A. (eds.) Handbook of Formal Languages: Vol-ume 1 Word, Language, Grammar , 111–174. https://doi. org/10.1007/978-3-642-59136-5 (Springer Berlin Heidel-berg, Berlin, DE, 1997). [67] Strobl, L., Merrill, W., Weiss, G., Chiang, D. & Angluin, D. What Formal Languages Can Transformers Express? A Survey. Transactions of the Association for Computa-tional Linguistics 12 , 543–561. doi:10.1162/tacl a 00663 (2024). [68] Bingham, E. et al. Pyro: Deep Universal Probabilistic Programming. Journal of Machine Learning Research 

20 , 1–6 (2019). [69] Phan, D., Pradhan, N. & Jankowiak, M. Composable Effects for Flexible and Accelerated Probabilistic Pro-gramming in NumPyro. In Program Transformations for ML Workshop at NeurIPS 2019 (2019). 15 

## Appendices for Scaling of Capability & Efficiency at Inference Time in Large Reasoning Models 

Moritz Laber, Zohair Shafi, Germans Savcisens, Brennan Klein, Matteo Chinazzi, Samuel V. Scarpino, Albert-L´ aszl´ o Barab´ asi, Alessandro Vespignani, Tina Eliassi-Rad 

laber.m@northeastern.edu 

Appendix A: Likelihood Variance in PM and PEM 

For ease of notation, we drop the subscripts N, n, τ in this section. Let {Lr }yr=1 be a collection of random variables, each with mean μL and variance σ2

> L

. Then their arithmetic mean ¯L = 1

y

> y

X

> r=1

Lr (A1) is itself a random variable with expected value 

E  ¯L = E

"

1

y

> y

X

> r=1

Lr

#

= 1

y

> y

X

> r=1

E[Lr ] = 1

y

> y

X

> r=1

μL = μL (A2) and variance Var  ¯L = Var 

"

1

y

> y

X

> r=1

Lr

#

= 1

y2 Var 

" yX

> r=1

Lr

#

= 1

y2

> y

X

> r=1

Var [ Lr ] = σ2

> L

y . (A3) If we observe f ( ¯L) for a sufficiently well-behaved function f , close to the expected value of ¯L, i.e., ¯L = μL + δ with 

E[δ] = 0 and Var[ δ] = σ2 

> L
> y

, we can use a first-order Taylor expansion to derive the mean 

E f ( ¯L) = E [f (μL + δ)] ≈ E [f (μL)] + f ′(μL)E [δ] = f (μL) (A4) and variance Var f ( ¯L) = Var [ f (μL + δ)] ≈ Var [ f (μL) + f ′(μL)δ] = f ′(μL)2Var [ δ] = f ′(μL)2 σ2

> L

y , (A5) where f ′ denotes the first derivative of f .In the PM and PEM, the relevant function f is the natural logarithm and hence 

E log ¯L ≈ log μL (A6) and Var log ¯L ≈ 1

μ2

> L

σ2

y , (A7) as ddx log x = 1 

> x

.

Appendix B: Additional Results 

This Appendix presents additional results on the scaling of capability and efficiency in models from the 

DeepSeek-R1-Distill model family. 2 Efficiency 16 

task τ stat. model E[β(ν) 

> τ

| D ] CrI 95% [β(ν) 

> τ

] E[η(ν) 

> τ

| D ] CrI 95% [η(ν) 

> τ

]

addition 0.4 FAM 0.68 [0.51, 0.85] 0.22 [0.10, 0.47] 

addition 0.6 FAM 0.69 [0.53, 0.85] 0.20 [0.08, 0.44] 

addition 0.8 FAM 0.70 [0.52, 0.87] 0.23 [0.10, 0.47] 

brackets 0.4 FAM 0.65 [0.32, 0.97] 0.45 [0.26, 0.80] 

brackets 0.6 FAM 0.69 [0.31, 1.06] 0.52 [0.30, 0.91] 

brackets 0.8 FAM 0.57 [0.27, 0.86] 0.36 [0.17, 0.70] 

index 0.4 FAM 0.58 [0.24, 0.91] 0.48 [0.27, 0.84] 

index 0.6 FAM 0.52 [0.19, 0.86] 0.47 [0.27, 0.82] 

index 0.8 FAM 0.51 [0.18, 0.83] 0.45 [0.26, 0.80] 

parity 0.4 FAM 0.75 [0.38, 1.11] 0.51 [0.29, 0.88] 

parity 0.6 FAM 0.69 [0.40, 0.98] 0.40 [0.22, 0.72] 

parity 0.8 FAM 0.73 [0.41, 1.04] 0.43 [0.24, 0.78] 

addition 0.4 VAM 0.60 [0.41, 0.80] 0.25 [0.11, 0.51] 

addition 0.6 VAM 0.58 [0.39, 0.77] 0.24 [0.11, 0.49] 

addition 0.8 VAM 0.61 [0.40, 0.82] 0.27 [0.12, 0.53] 

brackets 0.4 VAM 0.26 [0.06, 0.46] 0.25 [0.11, 0.51] 

brackets 0.6 VAM 0.07 [-0.17, 0.30] 0.29 [0.12, 0.58] 

brackets 0.8 VAM 0.28 [0.00, 0.55] 0.33 [0.13, 0.66] 

index 0.4 VAM 0.49 [0.14, 0.84] 0.48 [0.27, 0.86] 

index 0.6 VAM 0.42 [0.06, 0.78] 0.51 [0.27, 0.90] 

index 0.8 VAM 0.42 [0.11, 0.72] 0.42 [0.21, 0.77] 

parity 0.4 VAM 0.34 [0.01, 0.67] 0.45 [0.25, 0.80] 

parity 0.6 VAM 0.25 [-0.07, 0.57] 0.44 [0.24, 0.79] 

parity 0.8 VAM 0.31 [-0.04, 0.67] 0.47 [0.25, 0.84] TABLE A1. Capability scaling. The posterior means of the scaling exponents β(ν) 

> τ

support a sublinear latent scaling for all tasks and temperatures, irrespective of the statistical model used. We also show 95% credible intervals. The posterior mean and 95% credible intervals of η(ν) 

> τ

indicate that the deviations from the latent scaling law are relatively small throughout. 

1. Capability 

Table A1 summarizes the results of our analysis of capability scaling for all reasoning tasks, temperatures, and statistical models. The inferred exponential decay scales are documented in Tab. A2. For the addition task, we find sublinear scaling E[β(ν) 

> τ

| D ] < 1 for both statistical models and at all temperatures. The expected size of deviations from the latent scaling law, E[η(ν) 

> τ

| D ], is small throughout. We find that the typical size of a solvable instance increases from ca. 20 at N = 1 .5 B parameters to several hundred at N = 70 B parameters. Model comparison favors the FAM over the VAM at all temperatures (Tab. A5). Turning to the brackets task, we find that the FAM infers higher scaling exponents than the VAM. The latter is favored in model comparison for all temperatures (Tab. A5), and shows lower deviations from the latent scaling law. Both statistical models agree that capability scaling is sublinear. On the index task, the FAM is favored over the VAM in model comparison (Tab. A5) at all temperatures. Both statistical models show sublinear scaling with similar scaling exponents. The deviations from the latent scaling law are moderate and of similar size for both statistical models. Finally, for the parity task, scaling is inferred to be sublinear but the FAM again infers higher scaling exponents than the VAM. However, the latter is preferred in model comparison (Tab. A5). Deviations from the latent scaling law are comparable in both cases. In summary, these results support sublinear scaling of model capability with model size. 

2. Efficiency 

Table A3 provides an overview of our analysis of efficiency scaling for all reasoning tasks, temperatures, and statistical models. Our analysis of the addition task using the PM shows that the posterior mean of the scaling exponent of the prefactor AN,τ is close to zero, |E[β(A) 

> τ

| D ]| ≤ 0.1. The PEM, which is preferred in model comparison, infers weakly negative expected scaling exponents for the prefactor AN,τ and the exponent αN,τ of the power law linking instance size and output length. However, the 95% credible interval covers both negative and positive values. 2 Efficiency 17                                                                                                                                                                                          

> E[νN,τ | D ]task τstat. model 1 .5 B 7 B 14 B 32 B 70 B
> addition 0.4 FAM 22 68 124 208 287
> addition 0.6 FAM 26 67 131 212 363
> addition 0.8 FAM 26 64 140 222 362
> brackets 0.4 FAM 24 54 244 161 299
> brackets 0.6 FAM 32 62 390 302 362
> brackets 0.8 FAM 825 44 85 66
> index 0.4 FAM 58 186 540 253 685
> index 0.6 FAM 75 202 615 287 679
> index 0.8 FAM 81 201 642 329 646
> parity 0.4 FAM 23 80 285 472 294
> parity 0.6 FAM 30 97 292 369 366
> parity 0.8 FAM 25 103 296 369 353
> addition 0.4 VAM 22 67 120 166 226
> addition 0.6 VAM 26 66 127 158 250
> addition 0.8 VAM 26 63 136 148 293
> brackets 0.4 VAM 22 44 45 60 61
> brackets 0.6 VAM 27 42 39 45 34
> brackets 0.8 VAM 12 26 27 45 32
> index 0.4 VAM 57 175 404 174 537
> index 0.6 VAM 74 194 421 157 538
> index 0.8 VAM 81 184 392 202 528
> parity 0.4 VAM 18 73 50 41 110
> parity 0.6 VAM 25 81 57 42 103
> parity 0.8 VAM 16 74 61 41 80 TABLE A2. Capability parameters. The model capability, quantified by the posterior mean of the scale νN,τ of the exponential decay of the expected number of correctly solved instances as a function of the instance size, generally increases as a function of the model size N.However, model-specific posterior means can be non-monotonic in some conditions. The parameter νN,τ can be thought of as the characteristic size scale of an instance that is tractable for models of size Nat temperature τ.

For the brackets task, we find slightly positive scaling exponents for the prefactor AN,τ at temperatures τ ∈{0.4, 0.6}, and an exponent close to zero at τ = 0 .8 using the PM. Similar values are obtained using the PEM. The former statistical model is preferred in model comparison. Using the PEM, we find scaling exponents for the exponent 

αN,τ close to zero, |E[β(α) 

> τ

| D ]| ≤ 0.06. When it comes to the index task, both the PM and the PEM indicate expected scaling exponents of the prefactor 

AN,τ of small magnitude, |E[β(A) 

> τ

| D ]| ≤ 0.05. The PEM also suggests a very weak dependence of the exponent 

αN,τ on the model size N , |E[β(α) 

> τ

| D ]| ≤ 0.07. The 95% credible intervals for these parameters cover both positive and negative values. Model comparison favors the PEM at temperature τ = 0 .8, and the PM at lower temperatures 

τ ∈ { 0.4, 0.6}.Finally, for the parity task both the PM and the PEM suggest that the expected scaling exponent of the prefactor 

AN,τ is slightly negative, −0.17 ≤ E[β(A) 

> τ

| D ] ≤ − 0.12. However, the 95% credible interval contains both positive and negative values. The PEM does not provide strong evidence for scaling of the exponent αN,τ with model size N ,as |E[β(α) 

> τ

| D ]| ≤ 0.06. Turning to the actually inferred values of the prefactor AN,τ and exponent αN,τ (Tab. A4), we find that the posterior mean E[αN,τ | D ] of the exponent ranges from 0 .41 to 0 .89. This suggests a sublinear scaling of output length with the instance size. This result is somewhat surprising given the time and space complexities documented in Tab. I. However, it is worth noting that reasoning tokens do not directly translate into computational steps. For example, in the addition task a model could compute the sum of several numbers without explicitly stating this computation, thereby achieving sublinear output length scaling. For the index task, on the other hand, Θ(1) time complexity requires special data structures that the model might not be able to exploit internally. The inferred prefactors AN,τ 

are on average (across model sizes and temperatures) largest for the addition task, and smallest for the index task. This pattern holds irrespective of the statistical model. Together, these results support the claim that efficiency scaling, formalized as a dependence of the prefactor AN,τ 

on the model size N , is weak or absent in the DeepSeek-R1-Distill model family applied to our four reasoning tasks. 2 Efficiency 18 

task τ stat. model E[β(A) 

> τ

| D ] CrI 95% [β(A) 

> τ

] E[η(A) 

> τ

| D ] CrI 95% [η(A) 

> τ

] E[β(α) 

> τ

| D ] CrI 95% [β(α) 

> τ

] E[η(α) 

> τ

| D ] CrI 95% [η(α) 

> τ

]

addition 0.4 PM -0.05 [-0.44, 0.35] 0.53 [0.33, 0.79] - - 0.25 [0.10, 0.48] 

addition 0.6 PM -0.07 [-0.50, 0.41] 0.51 [0.30, 0.78] - - 0.26 [0.10, 0.50] 

addition 0.8 PM -0.08 [-0.51, 0.41] 0.55 [0.33, 0.82] - - 0.30 [0.15, 0.54] 

brackets 0.4 PM 0.15 [0.00, 0.29] 0.13 [0.01, 0.38] - - 0.11 [0.00, 0.32] 

brackets 0.6 PM 0.12 [-0.03, 0.25] 0.14 [0.01, 0.38] - - 0.08 [0.00, 0.25] 

brackets 0.8 PM -0.02 [-0.16, 0.12] 0.15 [0.01, 0.38] - - 0.10 [0.00, 0.29] 

index 0.4 PM -0.05 [-0.34, 0.25] 0.43 [0.25, 0.69] - - 0.08 [0.00, 0.25] 

index 0.6 PM -0.03 [-0.32, 0.25] 0.42 [0.24, 0.68] - - 0.09 [0.00, 0.28] 

index 0.8 PM 0.01 [-0.23, 0.26] 0.35 [0.18, 0.60] - - 0.20 [0.04, 0.43] 

parity 0.4 PM -0.17 [-0.53, 0.19] 0.55 [0.35, 0.81] - - 0.26 [0.07, 0.50] 

parity 0.6 PM -0.15 [-0.50, 0.21] 0.54 [0.35, 0.80] - - 0.25 [0.07, 0.49] 

parity 0.8 PM -0.12 [-0.45, 0.22] 0.52 [0.33, 0.77] - - 0.25 [0.11, 0.48] 

addition 0.4 PEM -0.09 [-0.49, 0.32] 0.54 [0.33, 0.80] -0.11 [-0.31, 0.09] 0.23 [0.07, 0.48] 

addition 0.6 PEM -0.13 [-0.58, 0.38] 0.53 [0.31, 0.81] -0.12 [-0.33, 0.12] 0.25 [0.08, 0.50] 

addition 0.8 PEM -0.14 [-0.57, 0.35] 0.56 [0.35, 0.83] -0.13 [-0.35, 0.10] 0.28 [0.13, 0.53] 

brackets 0.4 PEM 0.15 [0.01, 0.29] 0.12 [0.00, 0.38] 0.06 [-0.07, 0.20] 0.12 [0.00, 0.35] 

brackets 0.6 PEM 0.12 [-0.02, 0.25] 0.14 [0.01, 0.38] 0.04 [-0.06, 0.15] 0.09 [0.00, 0.29] 

brackets 0.8 PEM -0.02 [-0.16, 0.12] 0.15 [0.01, 0.39] -0.02 [-0.15, 0.12] 0.12 [0.00, 0.36] 

index 0.4 PEM -0.05 [-0.34, 0.25] 0.43 [0.26, 0.69] -0.02 [-0.14, 0.10] 0.09 [0.00, 0.31] 

index 0.6 PEM -0.03 [-0.32, 0.25] 0.42 [0.24, 0.68] 0.00 [-0.12, 0.13] 0.11 [0.00, 0.34] 

index 0.8 PEM 0.01 [-0.24, 0.26] 0.35 [0.18, 0.60] 0.07 [-0.11, 0.25] 0.21 [0.03, 0.46] 

parity 0.4 PEM -0.17 [-0.53, 0.19] 0.55 [0.35, 0.81] -0.03 [-0.25, 0.20] 0.28 [0.09, 0.55] 

parity 0.6 PEM -0.15 [-0.50, 0.21] 0.54 [0.35, 0.81] 0.04 [-0.17, 0.26] 0.27 [0.09, 0.53] 

parity 0.8 PEM -0.12 [-0.45, 0.22] 0.52 [0.33, 0.77] 0.06 [-0.14, 0.26] 0.27 [0.12, 0.51] TABLE A3. Efficiency scaling. The posterior mean of the scaling exponent β(A) 

> τ

of the prefactor AN,τ of the power law linking instance size n and average output length ¯ℓN,n,τ for a correctly solved instance is close to zero, compatible with the idea that efficiency does not scale with model size. Its 95% credible interval covers both positive and negative values in most cases. These results hold for both statistical models. The PEM, which also allows for scaling of the power law exponent αN,τ ,shows low posterior mean values of the associated scaling exponent β(α) 

> τ

, with a 95% credible interval covering both positive and negative values. The expected values of standard deviations η(A) 

> τ

and η(α) 

> τ

of the random effects associated with either scaling law tend to be small. 

Appendix C: Model Comparison 

Table A5 summarizes the results on model comparison using leave-one-out expected log predictive density (elpd). Higher values of this quantity indicate a better predictive performance on held-out data. When assessing statistical models of capability scaling, we find that the FAM is preferred over the VAM on the 

addition and index tasks for all temperatures, while the VAM is favored over the FAM on the brackets and parity 

tasks, again, for all temperatures. Turning to models of efficiency scaling, we find overall much smaller differences in elpd between the PM and the PEM. On the addition task the PEM is the model of choice at all temperatures. On the brackets task the PM is slightly preferred across temperatures. Looking at the index task, the PM is favored at temperature τ ∈ { 0.4, 0.6}

but narrowly disfavored at temperature τ = 0 .8. Finally, for the parity task the PM appears to be the better statistical model across temperatures. 

Appendix D: Brackets 

Here, we provide evidence that models are not exploiting the potential shortcut in the brackets task based on the length difference of correct and incorrect instances. Figure A1 shows, across model sizes N and temperatures τ

(Fig. A1 (a) -(e) τ = 0 .4, Fig. A1 (f ) -(j) τ = 0 .6, Fig. A1 (k) -(o) τ = 0 .8), the number nstack of answers to instances (out of a total of R = 100 instances) of the brackets task that contain the term stack or Stack . We see that the term appears often in all combinations of model size and temperature, and is present in almost all answers in larger models, irrespective of temperature. This makes it seem plausible that models rely on stack-based algorithms instead of a length-based shortcut to solve the brackets task. Answers to individual instances that we inspected corroborate this. 19 

E[AN,τ | D ] E[αN,τ | D ]task τ stat. model 1.5 B 7 B 14 B 32 B 70 B 1.5 B 7 B 14 B 32 B 70 B 

addition 0.4 PM 11577 2990 13029 3992 8621 0.78 0.65 0.77 0.77 0.48 

addition 0.6 PM 15319 3301 11628 4468 9031 0.75 0.68 0.74 0.80 0.47 

addition 0.8 PM 17387 3002 12952 4573 9418 0.79 0.64 0.73 0.82 0.42 

brackets 0.4 PM 3748 4677 5595 5589 6905 0.57 0.63 0.65 0.63 0.62 

brackets 0.6 PM 3919 4168 5346 5189 6129 0.56 0.59 0.61 0.60 0.59 

brackets 0.8 PM 4607 3846 3745 4017 4199 0.49 0.52 0.48 0.51 0.48 

index 0.4 PM 4684 1631 3409 1969 3951 0.55 0.54 0.56 0.54 0.53 

index 0.6 PM 4720 1820 3544 2171 4372 0.53 0.55 0.57 0.57 0.52 

index 0.8 PM 4035 2120 3612 2562 4360 0.43 0.58 0.61 0.62 0.50 

parity 0.4 PM 8902 5198 4716 1376 7590 0.57 0.72 0.46 0.45 0.64 

parity 0.6 PM 8285 4890 6480 1444 7653 0.46 0.70 0.50 0.45 0.63 

parity 0.8 PM 7175 5547 6968 1619 7461 0.42 0.72 0.54 0.47 0.62 

addition 0.4 PEM 14435 3096 13047 3987 8611 0.87 0.67 0.77 0.76 0.47 

addition 0.6 PEM 20825 3363 11707 4451 9025 0.87 0.70 0.74 0.79 0.45 

addition 0.8 PEM 22228 3058 12975 4564 9422 0.89 0.65 0.73 0.81 0.41 

brackets 0.4 PEM 3737 4678 5597 5635 6934 0.52 0.62 0.65 0.65 0.65 

brackets 0.6 PEM 3931 4173 5353 5198 6138 0.52 0.58 0.61 0.62 0.61 

brackets 0.8 PEM 4597 3848 3748 4015 4190 0.50 0.53 0.48 0.50 0.46 

index 0.4 PEM 4702 1635 3412 1965 3988 0.56 0.54 0.56 0.54 0.51 

index 0.6 PEM 4716 1820 3547 2173 4352 0.53 0.55 0.57 0.57 0.52 

index 0.8 PEM 3960 2112 3607 2566 4321 0.41 0.57 0.61 0.63 0.52 

parity 0.4 PEM 8932 5192 4695 1374 7607 0.58 0.73 0.45 0.44 0.64 

parity 0.6 PEM 8278 4890 6477 1443 7660 0.45 0.70 0.49 0.44 0.64 

parity 0.8 PEM 7181 5550 6964 1621 7462 0.41 0.72 0.54 0.47 0.62 TABLE A4. Efficiency parameters. The inferred prefactors AN,τ and exponents αN,τ of the power law linking instance size 

n and average output length ¯ℓN,n,τ for a correctly solved instance indicate sublinear scaling of ¯ℓN,n,τ with n across tasks and temperatures irrespective of the statistical model. The prefactors AN,τ differ by task but less by temperature. task τ elpd FAM elpd VAM elpd PM elpd PEM 

addition 0.4 -201 -217 -26.1 -25.3 

addition 0.6 -199 -212 -27.6 -26.8 

addition 0.8 -212 -224 -19.0 -17.7 

brackets 0.4 -301 -184 -42.2 -42.3 

brackets 0.6 -319 -187 -28.0 -28.5 

brackets 0.8 -270 -198 -29.0 -30.3 

index 0.4 -240 -248 -14.7 -16.8 

index 0.6 -230 -233 -24.3 -26.0 

index 0.8 -214 -222 -25.6 -25.3 

parity 0.4 -380 -213 -42.4 -42.5 

parity 0.6 -336 -209 -40.2 -40.3 

parity 0.8 -343 -261 -17.1 -17.2 TABLE A5. Model comparison. Comparing the different statistical models for capability scaling (FAM, VAM) and efficiency scaling (PM, PEM) for different tasks ( addition , brackets , index , parity ) and temperatures τ ∈ { 0.4, 0.6, 0.8} shows that different statistical models are preferable in different settings. We indicate the preferred model, i.e., the one with higher expected log predictive density (elpd, higher values are better), in bold. 20 050 100 150 

> nstack

(a) 

## N = 1 .5B 

(b) 

## N = 7B 

(c) 

## N = 14B 

(d) 

## N = 32B 

(e) 

> τ = 0 .4

## N = 70B 

050 100 150 

> nstack

(f) (g) (h) (i) (j) 

> τ = 0 .6

0 500 

n

050 100 150 

> nstack

(k) 

0 500 

n

(l) 

0 500 

n

(m) 

0 500 

n

(n) 

0 500 

n

(o) 

> τ = 0 .8

FIG. A1. Shortcut check. The number nstack of answers to instances of the brackets task that contain either stack or Stack 

as a function of the instance size n for different temperatures τ (rows) and model sizes N (columns) indicates that this term is common across experimental conditions, especially for models with N ≥ 7 B parameters. This is consistent with models using a stack-based algorithm rather than a length-based shortcut.
