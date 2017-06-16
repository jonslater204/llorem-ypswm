md5=function(){for(var m=[],l=0;64>l;)m[l]=0|4294967296*Math.abs(Math.sin(++l));return function(c){var e,g,f,a,h=[];c=unescape(encodeURI(c));for(var b=c.length,k=[e=1732584193,g=-271733879,~e,~g],d=0;d<=b;)h[d>>2]|=(c.charCodeAt(d)||128)<<8*(d++%4);h[c=16*(b+8>>6)+14]=8*b;for(d=0;d<c;d+=16){b=k;for(a=0;64>a;)b=[f=b[3],(e=b[1]|0)+((f=b[0]+[e&(g=b[2])|~e&f,f&e|~f&g,e^g^f,g^(e|~f)][b=a>>4]+(m[a]+(h[[a,5*a+1,3*a+5,7*a][b]%16+d]|0)))<<(b=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*b+a++%4])|f>>>32-b),e,g];for(a=4;a;)k[--a]=k[a]+b[a]}for(c='';32>a;)c+=(k[a>>3]>>4*(1^a++&7)&15).toString(16);return c}}();
var lY = {
   e: '',
   o: 0,
   a: [
      ['b', 'c', 'ch', 'd', 'dd', 'f', 'ff', 'g', 'ng', 'h', 'l', 'll', 'm', 'n', 'p', 'ph', 'r', 'rh', 's', 't', 'th'],
      ['a', 'e', 'i', 'o', 'u', 'w', 'y']
   ],
   p: [],
   
   r: function(salt)
	{
		this.e = md5(this.e + salt);
	},
   
   v: function(length)
	{
		length = Math.min(this.e.length, length);
		
		var extract = this.e.substr(this.o, length);
		
		this.o += length;
		
		if (extract.length < length)
		{
			extract += this.e.substr(0, length - extract.length);
			this.o = length - extract.length;
		}
		
		this.r(extract);
		
		return parseInt(extract, 16);
	},
	
	l: function(type)
	{
		return this.a[type][parseInt(this.v(3) * (this.a[type].length - 1) / 4096)];
	},
   
   s: function(sentence)
   {
      // Capitalise first characters of sentences
      sentence = sentence.join(' ');
      this.p.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
   },
   
   t: function(words)
   {
      var sentence = [];
      var word = 'Llorem';
      this.e = word;
      sentence.push(word);
      word = 'ypswm';
      this.r(word);
      sentence.push(word);
      var type = null;
      var type_count;
      var new_type;

      for (var w = 1; w <= words; ++w)
      {
         // Choose word length
         length = parseInt(this.v(3) * 10 / 4096) + 1;
         word = '';
         type_count = 0;
         for (var l = 1; l <= length; ++l)
         {
            // Pick a consonant or vowel
            if (type_count >= 2)
            {
               type = 1 - type;
               type_count = 1;
            }
            else
            {
               new_type = (length === 1)
                  ? 1
                  : (
                     (this.v(1) < 7 + (type_count * 6 - 3))
                     ? 0
                     : 1);
               if (type === new_type)
               {
                  ++type_count;
               }
               else
               {
                  type_count = 1;
               }
               type = new_type;
            }
            word += this.l(type);
         }
         // Maybe add some commas, fullstops.
         if (sentence.length && this.v(1) < 1)
         {
            sentence.push(word);
            this.s(sentence);
            sentence = [];
         }
         else
         {
            if (this.v(1) < 1)
            {
               word += ',';
            }
            sentence.push(word);
         }
      }
      this.s(sentence);
      return this.p.join('. ') + '.';
   }
};

// Get specified or random number of words
var words = prompt('Number of words:');
if (!words) words = parseInt(Math.random() * 100);

var body = document.getElementsByTagName('body')[0];
var div = document.createElement('div');
div.setAttribute('id', '_lloremYpswm');
div.style.position = 'absolute';
div.style.top = div.style.left = 0;
div.style.width = 'calc(100% - 20px)';
div.style.padding = '20px 10px 10px';
div.style.color = '#000';
div.style.backgroundColor = '#CCC';
div.style.boxShadow = '0 2px 3px 0 #666';
div.style.WebkitTransform = div.style.transform = 'translateY(-100%) translateY(-10px)';
div.style.WebkitTransition = 'WebkitTransform 1s linear';
div.style.transition = 'transform 1s linear';
div.style.font = '16px/1.5 sans-serif';
div.style.textTransform = 'none';
div.innerText = lY.t(words);
var close = document.createElement('div');
close.style.position = 'absolute';
close.style.top = close.style.right = 0;
close.style.padding = '3px';
close.style.fontWeight = 700;
close.style.cursor = 'pointer';
close.innerText = 'close';
close.addEventListener('click', function() {
   var div = document.getElementById('_lloremYpswm');
   if (div)
   {
      div.style.WebkitTransform = div.style.transform = 'translateY(-100%) translateY(-10px)';
      setTimeout(function() {body.removeChild(div)}, 1000);
   }
});
div.appendChild(close);
body.appendChild(div);
scrollTo(div.offsetLeft, div.offsetTop);
setTimeout(function(){div.style.WebkitTransform = div.style.transform = 'translateY(0)'}, 0);