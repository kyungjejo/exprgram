import language_check
from nltk import bigrams, word_tokenize, sent_tokenize
from nltk.util import ngrams, pad_sequence, everygrams
from nltk.lm.preprocessing import pad_both_ends, flatten, padded_everygram_pipeline
from nltk.lm import MLE
from nltk import ConditionalFreqDist
from nltk.corpus import movie_reviews
from nltk.probability import ConditionalProbDist, MLEProbDist
from nltk.tokenize.treebank import TreebankWordDetokenizer
from grammarbot import GrammarBotClient
import numpy as np
import dill as pickle
import math
from autocorrect import Speller

def ngram_language_model(corpus, n):
    # form of corpus: [[word, word, word], [word, word, ..., word]]
    # ngram language model
    train_data, padded_sents = padded_everygram_pipeline(n, corpus)
    print(padded_sents)
    model = MLE(n)
    model.fit(train_data, padded_sents)
    print(len(model.vocab))
    
    with open('ngram_model.pkl', 'wb') as fout:
        pickle.dump(model, fout)
    return model


def bigram_language_model(corpus, n):
    # form of corpus: [[word, word, word], [word, word, ..., word]]
    # bigrams language model
    sentences = []

    for tokens in corpus:
        ngram = ngrams(tokens, n, pad_left=True, pad_right=True, left_pad_symbol="SS", right_pad_symbol="SE")
        sentences += [t for t in ngram]

    print(sentences[:20])
    cfd = ConditionalFreqDist(sentences)
    cpd = ConditionalProbDist(cfd, MLEProbDist)

    return cfd, cpd


def ngram_sentence_score(sentence, model, n):
    text_tokens = word_tokenize(sentence.lower())
    print(model.vocab.lookup(text_tokens))
    p = 0.0
    for i in range(n-1, len(text_tokens) - 1):
        current = text_tokens[i]
        prev = text_tokens[i-n+1:i]
        print(current, prev)
        print(model.logscore(current, prev))
        if math.isinf(model.logscore(current, prev)):
            p += model.logscore(current, prev)
            return np.exp(p)
        p += model.logscore(current, prev)
    return np.exp(p)


def bigram_sentence_score(sentence, cpd):
    text_tokens = word_tokenize(sentence)
    p = 0.0
    for i in range(len(text_tokens) - 1):
        c = text_tokens[i]
        w = text_tokens[i + 1]
        p += np.log(cpd[c].prob(w) + np.finfo(float).eps)
    return np.exp(p)


def ngram_generate_sent(model, num_words, random_seed):
    detokenize = TreebankWordDetokenizer().detokenize
    sentence = []
    for token in model.generate(num_words, random_seed=random_seed):
        if token == '<s>':
            continue
        if token == '</s>':
            break
        sentence.append(token)
    return detokenize(sentence)


def grammar_checker(text):
    correct_texts = [] # collect possible ways of fixing text
    # spell checking & grammar checking with language_check module
    tool = language_check.LanguageTool('en-US')
    matches = tool.check(text)
    correct_texts.append(language_check.correct(text, matches))

    # spell checking & grammar checking with grammarbot module
    client = GrammarBotClient()
    res = client.check(text)
    for match in res.matches:
        for correction in match.corrections:
            correct_texts.append(correction)

    print("grammar check")
    for text in correct_texts:
        print(text)

    return correct_texts


def spelling_checker(sentence_list):
    spell = Speller(lang='en')
    correct_texts = []

    for sent in sentence_list:
        new_sent = spell(sent)

        if new_sent not in correct_texts:
            correct_texts.append(new_sent)
    
    print("spelling check")
    for text in correct_texts:
        print(text)

    return correct_texts


if __name__ == '__main__':
    text = "If I was an idle, I would not go to the workplece."

    with open("nytimes_news_articles.txt", "r") as f:
        corpus = f.read().splitlines()
        nytimes_corpus = []
        for line in corpus:
            for sent in sent_tokenize(line):
                if len(sent) != 0:
                    if word_tokenize(sent)[0] != "URL":
                        nytimes_corpus.append(word_tokenize(sent.lower()))
    
    corpus = nytimes_corpus
    for sent in movie_reviews.sents():
        corpus.append(sent)

    #cfd, cpd = bigram_language_model(movie_reviews.sents(), 3)
    print(len(corpus))
    trigram_model = ngram_language_model(corpus, 3)
    
    correct_texts = grammar_checker(text)
    correct_texts = spelling_checker(correct_texts)
    score_of_cor_text = {}

    with open('ngram_model.pkl', 'rb') as fin:
        model = pickle.load(fin)

    for text in correct_texts:
        score_of_cor_text[text] = ngram_sentence_score(text, model, 3)
    print(score_of_cor_text)
    cor_text_ranking = sorted(score_of_cor_text.items(), key=(lambda x: x[1]), reverse=True)
    print(cor_text_ranking)
    print(ngram_generate_sent(model, 15, random_seed=8))

