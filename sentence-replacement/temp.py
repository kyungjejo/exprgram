#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random

word_list = open('./google-10000-english-no-swears.txt').readlines()
if __name__ == '__main__':
    vocabulary_size = input('Vocabulary size를 입력해주세요.')

    vocabulary_size = int(vocabulary_size)
    if vocabulary_size>9000:
        print('배울 단어가 없습니다.')
        pass

    else:
        thousands = vocabulary_size // 1000 + 1
        if thousands > 8:
            lower = vocabulary_size
            upper = len(word_list)
        else:
            lower = thousands * 1000
            upper = (thousands + 1) * 1000
        candidates = range(lower, upper)
        word_index = random.choice(candidates)
        target_word = word_list[word_index]
        print("Target word: {}".format(target_word))
