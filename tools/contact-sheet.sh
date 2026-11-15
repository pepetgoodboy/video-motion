#!/bin/bash
# Lembar kontak cepat untuk review frame: tools/contact-sheet.sh out.png f1.png f2.png ...
# Tiap gambar diskalakan 360x640 + label nama file, ditumpuk horizontal (maks ±6 gambar per lembar).
out=$1; shift; args=(); lab=""; i=0
for f in "$@"; do args+=(-i "$f"); lab+="[$i:v]scale=360:640,drawtext=text='$(basename "$f" .png)':x=10:y=10:fontsize=28:fontcolor=yellow:box=1:boxcolor=black@0.6[v$i];"; i=$((i+1)); done
st=""; for j in $(seq 0 $((i-1))); do st+="[v$j]"; done
ffmpeg -v error -y "${args[@]}" -filter_complex "${lab}${st}hstack=inputs=$i" "$out"
