import re
import nltk
from nltk.tokenize import word_tokenize
nltk.download('punkt')
# nltk.download('punkt_tab')
from nltk.corpus import stopwords
nltk.download('stopwords')

def clean_text(text):
    text= text.lower()
    # Remove basic punctuation (keep Nepali/Unicode letters)
    text = re.sub(r'[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]', '', text)

    # Remove only English digits, preserve Nepali numerals
    text = re.sub(r'[0-9]+', '', text)

    # Remove HTML tags
    text = re.sub(r'<.*?>', '', text)

    # Remove emojis
    emoji_pattern = re.compile(
        "["
        u"\U0001F600-\U0001F64F" # emoticons (Matches Unicode characters from U+1F600 to U+1F64F, which include smiley faces, winking faces, and other emoticon-like characters)
        u"\U0001F300-\U0001F5FF" # symbols & pictographs (Matches characters from U+1F300 to U+1F5FF, including weather symbols, food, animals, and other pictographs)
        u"\U0001F680-\U0001F6FF" # transport & map (Matches characters from U+1F680 to U+1F6FF, covering transport-related symbols like cars, planes, and map symbols)
        u"\U0001F1E0-\U0001F1FF" # flags (iOS) (Matches regional indicator symbols from U+1F1E0 to U+1F1FF, which are used to represent country flags)
        "]+", flags=re.UNICODE)
    text = emoji_pattern.sub(r'', text)

    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)

    # Remove multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()

    return text


def tokenize_text(text):
    return word_tokenize(text)


def set_stopwords():
    #english stopwords from nltk
    english_stopwords = set(stopwords.words('english'))

#nepali stopwords defining
    nepali_stopwords=set([
    'अझै', 'अधिक', 'अन्य', 'अन्यत्र', 'अन्यथा', 'अब', 'अरु', 'अरुलाई', 'अर्को', 'अर्थात', 
    'अर्थात्', 'अलग', 'आए', 'आजको', 'आत्म', 'आदि', 'आफू', 'आफूलाई', 'आफै', 'आफैलाई', 
    'आफैले', 'आफ्नै', 'आफ्नो', 'आयो', 'उनको', 'उनले', 'उनि', 'उनी', 'उनीहरु', 'उप', 
    'उसलाई', 'उस्तै', 'उहाँ', 'उहालाई', 'ऊ', 'एउटै', 'एक', 'एकदम', 'ओठ', 'औं', 
    'कतै', 'कसरी', 'कसै', 'कसैले', 'कस्तो', 'कहाँ', 'कहाँबाट', 'कहिले', 'कहिलेकाहीं', 'का', 
    'कि', 'किन', 'किनभने', 'कुनै', 'कुरा', 'कृपया', 'के', 'केवल', 'केहि', 'केही', 
    'को', 'कोही', 'गए', 'गयौ', 'गर', 'गरि', 'गरी', 'गरे', 'गरेका', 'गरेको', 
    'गरेर', 'गरौं', 'गर्छ', 'गर्छु', 'गर्दछ', 'गर्दै', 'गर्न', 'गर्नु', 'गर्नुपर्छ', 'गर्ने', 
    'गर्नेछन्', 'गर्नेछौ', 'गैर', 'चार', 'चाले', 'चाहनुहुन्छ', 'चाहन्छु', 'चाहन्छौ', 'चाहन्छौं', 'चाहन्थे', 
    'चाहिए', 'छ', 'छन्', 'छु', 'छू', 'छैन', 'छौं', 'जब', 'जबकि', 'जसको', 
    'जसबाट', 'जसमा', 'जसलाई', 'जसले', 'जस्तै', 'जस्तो', 'जहाँ', 'जान', 'जाहिर', 'जुन', 
    'जे', 'जो', 'ठीक', 'त', 'तत्काल', 'तथा', 'तदनुसार', 'तपाई', 'तपाईं', 'तपाईको', 
    'तर', 'तल', 'तापनी', 'तिनिहरुलाई', 'तिनी', 'तिनीहरुको', 'तिनीहरू', 'तिनीहरूको', 'तिमि', 'तिमी', 
    'तिमीसँग', 'तिम्रो', 'तिर', 'ती', 'तीन', 'तुरुन्तै', 'तेस्कारण', 'तेस्रो', 'त्यसपछि', 'त्यहाँ', 
    'त्यो', 'त्सपछि', 'त्सैले', 'थप', 'थिए', 'थिएन', 'थिएनन्', 'थियो', 'दिए', 'दिनुभएको', 
    'दिनुहुन्छ', 'दुई', 'दुबै', 'देखि', 'देखिन्छ', 'देखियो', 'देखे', 'देखेको', 'देखेर', 'दोस्रो', 
    'द्वारा', 'धेरै', 'न', 'नगर्नुहोस्', 'नजिकै', 'नत्र', 'नयाँ', 'नि', 'निम्ति', 'निम्न', 
    'नै', 'नौ', 'पक्का', 'पक्कै', 'पछि', 'पछिल्लो', 'पटक', 'पनि', 'पर्छ', 'पर्थ्यो', 
    'पर्याप्त', 'पहिले', 'पहिलो', 'पहिल्यै', 'पाँच', 'पाँचौं', 'पूर्व', 'प्रति', 'प्रतेक', 'प्रत्येक', 
    'प्लस', 'फेरि', 'फेरी', 'बने', 'बन्द', 'बरु', 'बाट', 'बारे', 'बारेमा', 'बाहिर', 
    'बाहेक', 'बिरुद्ध', 'बिशेष', 'बीच', 'बीचमा', 'भए', 'भएको', 'भन', 'भने', 'भन्', 
    'भन्छन्', 'भन्छु', 'भन्दा', 'भन्नुभयो', 'भन्ने', 'भर', 'भित्र', 'भित्री', 'म', 'मँ', 
    'मलाई', 'मा', 'मात्र', 'माथि', 'मार्फत', 'मुख्य', 'मेरो', 'मैले', 'यति', 'यथोचित', 
    'यदि', 'यद्यपि', 'यस', 'यसको', 'यसपछि', 'यसबाहेक', 'यसरी', 'यसैले', 'यसो', 'यस्तो', 
    'यहाँ', 'यहाँसम्म', 'या', 'यी', 'यो', 'र', 'रही', 'रहेका', 'रहेको', 'राखे', 
    'राख्छ', 'राम्रो', 'रूप', 'लगभग', 'लाई', 'लागि', 'ले', 'वरीपरी', 'वा', 'वास्तवमा', 
    'विरुद्ध', 'शायद', 'सकदिन', 'सकिएन', 'सक्छ', 'सक्दैन', 'संग', 'संगै', 'सट्टा', 'सधै', 
    'सबै', 'सबैलाई', 'समय', 'समयमा', 'सम्भव', 'सम्म', 'सही', 'साँच्चै', 'सात', 'साथ', 
    'साथै', 'सायद', 'सारा', 'सो', 'सोही', 'स्पष्ट', 'हरे', 'हरेक', 'हामी', 'हामीसँग', 
    'हाम्रो', 'हुँ', 'हुँदैन', 'हुन', 'हुनु', 'हुनुहुन्छ', 'हुने', 'हुनेछ', 'हुनेछु', 'हुन्', 
    'हुन्छ', 'हुन्थे', 'हो', 'होइन', 'हौं'
])

#romanized Nepali stopwords defining
    romanized_nepali_stopwords = set([
    'aajhai', 'adhik', 'anya', 'anyatra', 'anyathaa', 'aba', 'aru', 'arulai', 'arko', 'arthat',
    'arthat', 'alag', 'aae', 'aajako', 'aatma', 'aadi', 'aafu', 'aafulai', 'aafai', 'aafailai',
    'aafaille', 'aafnai', 'aafno', 'aayo', 'unko', 'unle', 'uni', 'unii', 'uniiharu', 'upa',
    'uslai', 'ustai', 'uhaa', 'uhaalai', 'uu', 'ekutai', 'ek', 'ekdam', 'oth', 'aun',
    'katai', 'kasari', 'kasai', 'kasaile', 'kasto', 'kahaa', 'kahaanbaata', 'kahile', 'kahilekaahi', 'kaa',
    'ki', 'kina', 'kinabhane', 'kunai', 'kuraa', 'kripayaa', 'ke', 'kewal', 'kehi', 'kehi',
    'ko', 'kohi', 'gae', 'gayau', 'gara', 'gari', 'garii', 'gare', 'garekaa', 'gareko',
    'garera', 'garau', 'garchha', 'garchhu', 'gardacha', 'gardai', 'garna', 'garnu', 'garnuparchha', 'garne',
    'garnechhan', 'garnechhau', 'gaira', 'chaar', 'chaale', 'chaahanuhunchha', 'chaahanchhu', 'chaahanchhau', 'chaahanchhau', 'chaahanthe',
    'chaahie', 'chha', 'chhan', 'chhu', 'chhuu', 'chhaina', 'chhau', 'jaba', 'jabaki', 'jasko',
    'jasbaata', 'jasmaa', 'jaslai', 'jasle', 'jastai', 'jasto', 'jahaa', 'jaana', 'jaahir', 'juna',
    'je', 'jo', 'thiik', 'ta', 'tatkaal', 'tathaa', 'tadanusaar', 'tapaai', 'tapaaii', 'tapaaiiko',
    'tara', 'tala', 'taapani', 'tiniharulai', 'tinii', 'tiniharuko', 'tiniharuu', 'tiniharuuko', 'timi', 'timii',
    'timiisanga', 'timro', 'tira', 'tii', 'tiin', 'turuntai', 'teskaraan', 'tesro', 'tyaspachhi', 'tyahaa',
    'tyo', 'tspachhi', 'tsaile', 'thapa', 'thie', 'thiena', 'thienan', 'thiyo', 'die', 'dinubhaeko',
    'dinuhunchha', 'duui', 'dubai', 'dekhi', 'dekhinchha', 'dekhiyo', 'dekhe', 'dekheko', 'dekhera', 'dosro',
    'dwaaraa', 'dherai', 'na', 'nagarnuhos', 'najikai', 'natra', 'nayaa', 'ni', 'nimti', 'nimna',
    'nai', 'nau', 'pakkaa', 'pakkai', 'pachhi', 'pachhillo', 'patak', 'pani', 'parchha', 'parthyo',
    'paryaapta', 'pahile', 'pahilo', 'pahilyai', 'paanch', 'paanchau', 'purwa', 'prati', 'pratek', 'pratyek',
    'plasa', 'pheri', 'pherii', 'bane', 'banda', 'baru', 'baata', 'baare', 'baaremaa', 'baahira',
    'baaheka', 'biruddha', 'bishesha', 'biich', 'biichmaa', 'bhae', 'bhaeko', 'bhana', 'bhane', 'bhan',
    'bhanchhan', 'bhanchhu', 'bhandaa', 'bhannubhayo', 'bhanne', 'bhara', 'bhitra', 'bhitrii', 'ma', 'ma',
    'malai', 'maa', 'maatra', 'maathi', 'maarphata', 'mukhya', 'mero', 'maile', 'yati', 'yathochita',
    'yadi', 'yadyapi', 'yasa', 'yasko', 'yaspachhi', 'yasbaaheka', 'yasari', 'yasaile', 'yaso', 'yasto',
    'yahaa', 'yahaasamma', 'yaa', 'yii', 'yo', 'ra', 'rahi', 'rahekaa', 'raheko', 'raakhe',
    'raakhchha', 'raamro', 'ruup', 'lagabhaga', 'lai', 'laagi', 'le', 'wariipari', 'waa', 'waastawamaa',
    'wiruddha', 'shayada', 'sakadina', 'sakiena', 'sakchha', 'sakdaina', 'sanga', 'sangai', 'satta', 'sadhai',
    'sabai', 'sabaile', 'samaya', 'samayamaa', 'sambhawa', 'samma', 'sahi', 'saachchai', 'saata', 'saatha',
    'saathai', 'saayada', 'saaraa', 'so', 'sohi', 'spashta', 'hare', 'hareka', 'haami', 'haamisanga',
    'haamro', 'hu', 'hundaina', 'huna', 'hunu', 'hunuhunchha', 'hune', 'hunechha', 'hunechhu', 'hun',
    'hunchha', 'hunthe', 'ho', 'hoina', 'hau'
])

# Combining all the stopwords into a single set
    combined_stopwords_set = english_stopwords.union(nepali_stopwords).union(romanized_nepali_stopwords)
    return combined_stopwords_set
    

def remove_stopwords(tokens):
    stopwords_set = set_stopwords()
    filtered_tokens = [word for word in tokens if word not in stopwords_set]
    return filtered_tokens
