<!DOCTYPE html>
<head>
<title>Llorem Ypswm</title>
</head>
<body>
<?php
class lloremYpswm
{
	private $seed = '';
	private $pos = 0;
	
	private $alphabet = array(
		0 => array('b', 'c', 'ch', 'd', 'dd', 'f', 'ff', 'g', 'ng', 'h', 'l', 'll', 'm', 'n', 'p', 'ph', 'r', 'rh', 's', 't', 'th'),
		1 => array('a', 'e', 'i', 'o', 'u', 'w', 'y'),
	);
	
	private $paragraph = array();
	
	private function setSeedValue($word)
	{
		$this->seed = $word;
	}
	
	public function refreshSeed($salt)
	{
		$this->seed = md5($this->seed . $salt);
	}
	
	public function getSeedValue($length=1)
	{
		$length = min(strlen($this->seed), $length);
		
		$extract = substr($this->seed, $this->pos, $length);
		
		$this->pos += $length;
		
		if (strlen($extract) < $length)
		{
			$extract .= substr($this->seed, 0, $length - strlen($extract));
			$this->pos = $length - strlen($extract);
		}
		
		$this->refreshSeed($extract);
		
		return hexdec($extract);
	}
	
	private function getLetter($type)
	{
		return $this->alphabet[$type][(int) ($this->getSeedValue(3) * (count($this->alphabet[$type]) - 1) / 4096)];
	}
	
	private function addSentence($sentence)
	{
		$this->paragraph[] = ucfirst(implode(' ', $sentence));
	}
	
	public function getText($words)
	{
		$sentence = array();
		$word = 'Llorem';
		$this->setSeedValue($word);
		$sentence[] = $word;
		$word = 'ypswm';
		$this->refreshSeed($word);
		$sentence[] = $word;
		$type = null;
		//$pow = 1;

		for ($w = 0; $w < $words; ++$w)
		{
			// Choose word length
			//$length = (int) pow(base_convert(substr($seed, 0, 3), 16, 10) * 1000 / 4096, 0.25);
			//$length = (int) pow(base_convert(substr($seed, 0, 3), 16, 10) * pow(10, $pow) / 4096, 1 / $pow);
			$length = (int) ($this->getSeedValue(3) * 10 / 4096) + 1;
			$word = '';
			$type_count = 0;
			for ($l = 1; $l <= $length; ++$l)
			{
				// Pick a consonant or vowel
				if ($type_count >= 2)
				{
					$type = 1 - $type;
					$type_count = 1;
				}
				else
				{
					$new_type = ($length === 1)
						? 1
						: (($this->getSeedValue(1) < 7 + ($type_count * 6 - 3))
							? 0
							: 1);
					if ($type === $new_type)
					{
						++$type_count;
					}
					else
					{
						$type_count = 1;
					}
					$type = $new_type;
				}
				$word .= $this->getLetter($type);
			}
			if (count($sentence) && $this->getSeedValue(1) < 1)
			{
				$sentence[] = $word;
				$this->addSentence($sentence);
				$sentence = array();
			}
			else
			{
				if ($this->getSeedValue(1) < 1)
				{
					$word .= ',';
				}
				$sentence[] = $word;
			}
		}
		$this->addSentence($sentence);
		return implode('. ', $this->paragraph) . '.';
	}
}

// Get specified or random number of words
$words = filter_input(INPUT_GET, 'l', FILTER_VALIDATE_INT);
if (! $words) $words = mt_rand(0, 99);

$lY = new lloremYpswm();
echo $lY->getText($words);
?>
<script src="llorem_ypswm.js"></script>
</body>
</html>