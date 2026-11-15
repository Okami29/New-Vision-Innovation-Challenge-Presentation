import PptxGenJS from 'pptxgenjs';
import {
  CONTEST_COMPARISONS,
  CONTEST_STAGES,
  GEORGIA_SCHOOL_SCALE,
  PATHWAY_NODES,
  PRESENTATION_META,
  PROPOSED_DIRECTIONS,
  SLIDES,
} from '../data/presentationData';

const NAVY = '002A41';
const NAVY_DARK = '002235';
const TEAL = '00616F';
const TEAL_LIGHT = '89C4CC';
const PAPER = 'FBF9F5';
const STONE = 'F4F1EA';
const INK = '142029';
const MUTED = '4A5A66';
const BORDER = 'D6DCE0';
const BRONZE = '8C6239';
const WHITE = 'FFFFFF';

async function svgUrlToPngBase64(svgUrl: string, width = 483, height = 168): Promise<string | null> {
  try {
    const res = await fetch(svgUrl);
    if (!res.ok) return null;
    const svgText = await res.text();
    const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    return await new Promise<string | null>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/png');
        URL.revokeObjectURL(url);
        resolve(dataUrl);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
  } catch {
    return null;
  }
}

function addStandardChrome(
  slide: PptxGenJS.Slide,
  pptx: PptxGenJS,
  index: number,
  logoData: string | null,
  dark = false
) {
  const spec = SLIDES[index];
  slide.background = { color: dark ? NAVY : PAPER };

  slide.addShape(pptx.ShapeType.line, {
    x: 0.55,
    y: 1.05,
    w: 8.9,
    h: 0,
    line: { color: dark ? '264B60' : BORDER, width: 0.75 },
  });

  slide.addText(
    `სლაიდი ${spec.code} / 07  ·  NEW VISION INNOVATION CHALLENGE`,
    {
      x: 0.55,
      y: 0.22,
      w: 7.2,
      h: 0.22,
      fontSize: 8.5,
      fontFace: 'Noto Sans Georgian',
      color: dark ? TEAL_LIGHT : TEAL,
      bold: true,
    }
  );

  slide.addText(spec.title, {
    x: 0.55,
    y: 0.44,
    w: 7.3,
    h: 0.36,
    fontSize: 20,
    fontFace: 'Noto Serif Georgian',
    color: dark ? WHITE : NAVY,
    bold: true,
  });

  slide.addText(spec.subtitle, {
    x: 0.55,
    y: 0.8,
    w: 7.5,
    h: 0.22,
    fontSize: 9.5,
    fontFace: 'Noto Sans Georgian',
    color: dark ? 'C5D4DD' : MUTED,
  });

  if (logoData) {
    slide.addImage({
      data: logoData,
      x: 8.15,
      y: 0.3,
      w: 1.3,
      h: 0.45,
    });
  }

  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 5.26,
    w: 10,
    h: 0.365,
    fill: { color: dark ? NAVY_DARK : STONE },
    line: { color: dark ? '264B60' : BORDER, width: 0.5 },
  });

  slide.addText('New Vision University · სტრატეგიული წარდგენა მმართველი საბჭოსთვის', {
    x: 0.55,
    y: 5.33,
    w: 5.2,
    h: 0.22,
    fontSize: 8,
    fontFace: 'Noto Sans Georgian',
    color: dark ? '9BB1BE' : MUTED,
  });

  slide.addText(PRESENTATION_META.dateLabel, {
    x: 5.8,
    y: 5.33,
    w: 3.65,
    h: 0.22,
    fontSize: 8,
    fontFace: 'Noto Sans Georgian',
    color: dark ? '9BB1BE' : MUTED,
    align: 'right',
  });

  slide.addNotes(
    `[დრო: ${spec.startTime}–${spec.endTime} (${spec.durationSec} წამი)]\n\nმომხსენებლის ტექსტი:\n${spec.speakerScript}\n\nშენიშვნები:\n${spec.speakerNotes.map((n) => `• ${n}`).join('\n')}`
  );
}

export async function exportPresentationPptx(): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'New Vision Innovation Challenge';
  pptx.company = 'New Vision University';
  pptx.subject = 'New Vision Innovation Challenge — სტრატეგიული პრეზენტაცია';
  pptx.title = 'NEW VISION INNOVATION CHALLENGE';

  const [logoColor, logoWhite] = await Promise.all([
    svgUrlToPngBase64(`${import.meta.env.BASE_URL}brand/nvu-logo.svg`),
    svgUrlToPngBase64(`${import.meta.env.BASE_URL}brand/nvu-logo-white.svg`),
  ]);

  // ---------------- SLIDE 1: COVER ----------------
  {
    const slide = pptx.addSlide();
    const spec = SLIDES[0];
    slide.background = { color: NAVY };

    if (logoWhite) {
      slide.addImage({
        data: logoWhite,
        x: 0.65,
        y: 0.45,
        w: 1.55,
        h: 0.54,
      });
    }

    slide.addText(`სლაიდი 01 / 07`, {
      x: 6.5,
      y: 0.52,
      w: 2.85,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: TEAL_LIGHT,
      align: 'right',
      bold: true,
    });

    slide.addText('სტრატეგიული ინიციატივა · New Vision University', {
      x: 0.65,
      y: 1.45,
      w: 8.7,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Noto Sans Georgian',
      color: TEAL_LIGHT,
      bold: true,
    });

    slide.addText('NEW VISION\nINNOVATION CHALLENGE', {
      x: 0.65,
      y: 1.78,
      w: 8.7,
      h: 1.2,
      fontSize: 36,
      fontFace: 'Noto Serif Georgian',
      color: WHITE,
      bold: true,
    });

    slide.addText(PRESENTATION_META.projectSubtitle, {
      x: 0.65,
      y: 3.02,
      w: 8.7,
      h: 0.35,
      fontSize: 15,
      fontFace: 'Noto Sans Georgian',
      color: 'C8E4E8',
    });

    slide.addShape(pptx.ShapeType.line, {
      x: 0.65,
      y: 3.55,
      w: 7.2,
      h: 0,
      line: { color: '355A70', width: 1 },
    });

    slide.addText(PRESENTATION_META.coreMessage, {
      x: 0.65,
      y: 3.75,
      w: 8.4,
      h: 0.72,
      fontSize: 16,
      fontFace: 'Noto Serif Georgian',
      color: WHITE,
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 4.82,
      w: 10,
      h: 0.805,
      fill: { color: NAVY_DARK },
      line: { color: '264B60', width: 0.75 },
    });

    slide.addText(
      'New Vision University · მმართველი საბჭოსთვის წარმოდგენილი სტრატეგიული კონცეფცია',
      {
        x: 0.65,
        y: 5.05,
        w: 5.6,
        h: 0.35,
        fontSize: 9.5,
        fontFace: 'Noto Sans Georgian',
        color: WHITE,
      }
    );

    slide.addText(`თარიღი და დრო\n${PRESENTATION_META.dateLabel}`, {
      x: 6.3,
      y: 4.95,
      w: 3.05,
      h: 0.55,
      fontSize: 9.5,
      fontFace: 'Noto Sans Georgian',
      color: TEAL_LIGHT,
      align: 'right',
    });

    slide.addNotes(
      `[დრო: ${spec.startTime}–${spec.endTime} (${spec.durationSec} წამი)]\n\nმომხსენებლის ტექსტი:\n${spec.speakerScript}\n\nშენიშვნები:\n${spec.speakerNotes.map((n) => `• ${n}`).join('\n')}`
    );
  }

  // ---------------- SLIDE 2: EXISTING CONTESTS + VERIFIED NUMBERS ----------------
  {
    const slide = pptx.addSlide();
    addStandardChrome(slide, pptx, 1, logoColor, false);

    const colW = 2.84;
    const gap = 0.19;
    CONTEST_COMPARISONS.forEach((item, idx) => {
      const x = 0.55 + idx * (colW + gap);
      slide.addShape(pptx.ShapeType.roundRect, {
        x,
        y: 1.2,
        w: colW,
        h: 3.26,
        rectRadius: 0.05,
        fill: { color: WHITE },
        line: { color: BORDER, width: 0.75 },
      });

      slide.addText(
        `0${idx + 1} · ${idx === 2 ? 'ისტორიული' : idx === 0 ? '2011 წლიდან' : '2014 წლიდან'}`,
        {
        x: x + 0.16,
        y: 1.3,
        w: colW - 0.32,
        h: 0.2,
        fontSize: 8.5,
        fontFace: 'Noto Sans Georgian',
        color: TEAL,
        bold: true,
      });

      slide.addText(item.name, {
        x: x + 0.16,
        y: 1.52,
        w: colW - 0.32,
        h: 0.38,
        fontSize: 13,
        fontFace: 'Noto Serif Georgian',
        color: NAVY,
        bold: true,
      });

      slide.addShape(pptx.ShapeType.roundRect, {
        x: x + 0.16,
        y: 1.96,
        w: colW - 0.32,
        h: 0.82,
        rectRadius: 0.04,
        fill: { color: NAVY },
      });
      slide.addText(item.headlineNumber, {
        x: x + 0.26,
        y: 2.02,
        w: colW - 0.52,
        h: 0.36,
        fontSize: 20,
        fontFace: 'IBM Plex Mono',
        color: WHITE,
        bold: true,
      });
      slide.addText(item.headlineNumberLabel, {
        x: x + 0.26,
        y: 2.4,
        w: colW - 0.52,
        h: 0.32,
        fontSize: 8,
        fontFace: 'Noto Sans Georgian',
        color: 'C8E4E8',
      });

      slide.addShape(pptx.ShapeType.roundRect, {
        x: x + 0.16,
        y: 2.88,
        w: colW - 0.32,
        h: 0.68,
        rectRadius: 0.04,
        fill: { color: 'F7F5F0' },
      });
      slide.addText(item.secondaryNumber, {
        x: x + 0.26,
        y: 2.94,
        w: colW - 0.52,
        h: 0.24,
        fontSize: 12,
        fontFace: 'IBM Plex Mono',
        color: TEAL,
        bold: true,
      });
      slide.addText(item.secondaryNumberLabel, {
        x: x + 0.26,
        y: 3.18,
        w: colW - 0.52,
        h: 0.32,
        fontSize: 8,
        fontFace: 'Noto Sans Georgian',
        color: MUTED,
      });

      slide.addText(`სარგებელი NVU-სთვის:\n${item.lessonForNVU}`, {
        x: x + 0.16,
        y: 3.66,
        w: colW - 0.32,
        h: 0.72,
        fontSize: 8.5,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      });
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.55,
      y: 4.58,
      w: 8.9,
      h: 0.54,
      rectRadius: 0.05,
      fill: { color: NAVY },
    });

    slide.addText(
      '„ჩვენ შეგვიძლია წარმატებული გამოცდილების საფუძველზე შევქმნათ ახალი მოდელი, რომელიც უშუალოდ უნივერსიტეტის გრძელვადიან განვითარებას მოემსახურება.“',
      {
        x: 0.72,
        y: 4.65,
        w: 8.56,
        h: 0.4,
        fontSize: 10.5,
        fontFace: 'Noto Sans Georgian',
        color: WHITE,
        bold: true,
      }
    );
  }

  // ---------------- SLIDE 3: STRATEGIC VALUE + GEOSTAT SCALE ----------------
  {
    const slide = pptx.addSlide();
    addStandardChrome(slide, pptx, 2, logoColor, false);

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.55,
      y: 1.16,
      w: 8.9,
      h: 0.54,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: BORDER, width: 0.75 },
    });
    slide.addText(
      `საქართველოს სასკოლო მასშტაბი (საქსტატი 2025/2026):   ${GEORGIA_SCHOOL_SCALE.totalSchools} სკოლა (${GEORGIA_SCHOOL_SCALE.publicSchools} საჯარო · ${GEORGIA_SCHOOL_SCALE.privateSchools} კერძო)   |   ${GEORGIA_SCHOOL_SCALE.totalStudents} მოსწავლე (${GEORGIA_SCHOOL_SCALE.tbilisiShare} თბილისი · ${GEORGIA_SCHOOL_SCALE.regionsShare} რეგიონები)`,
      {
        x: 0.72,
        y: 1.24,
        w: 8.56,
        h: 0.38,
        fontSize: 9.2,
        fontFace: 'Noto Sans Georgian',
        color: NAVY,
        bold: true,
        valign: 'middle',
      }
    );

    const pillars = [
      {
        num: '01',
        title: 'მომავალი სტუდენტების მოზიდვა',
        desc: 'ურთიერთობა მოსწავლეებთან აბიტურიენტობამდე — პროექტული შემოქმედების ეტაპზე. რეალისტური, გასაზომი არხი.',
      },
      {
        num: '02',
        title: 'სკოლებში ცნობადობის ზრდა',
        desc: 'NVU-ს შესახებ ცოდნას ერთდროულად იღებენ მოსწავლეები, მშობლები, მასწავლებლები, სკოლის ადმინისტრაცია და რეგიონები.',
      },
      {
        num: '03',
        title: 'გრძელვადიანი ურთიერთობა',
        desc: 'ნიჭიერი მოსწავლეების აღმოჩენა VIII–IX კლასიდან, პროფესორთა მენტორობა და სკოლებთან ინსტიტუციური პარტნიორობა.',
      },
    ];

    const colW = 2.84;
    const gap = 0.19;
    pillars.forEach((p, idx) => {
      const x = 0.55 + idx * (colW + gap);
      slide.addShape(pptx.ShapeType.roundRect, {
        x,
        y: 1.82,
        w: colW,
        h: 1.68,
        rectRadius: 0.05,
        fill: { color: WHITE },
        line: { color: BORDER, width: 0.75 },
      });
      slide.addText(p.num, {
        x: x + 0.16,
        y: 1.9,
        w: 0.6,
        h: 0.28,
        fontSize: 16,
        fontFace: 'IBM Plex Mono',
        color: TEAL,
        bold: true,
      });
      slide.addText(p.title, {
        x: x + 0.16,
        y: 2.2,
        w: colW - 0.32,
        h: 0.36,
        fontSize: 12,
        fontFace: 'Noto Serif Georgian',
        color: NAVY,
        bold: true,
      });
      slide.addText(p.desc, {
        x: x + 0.16,
        y: 2.6,
        w: colW - 0.32,
        h: 0.82,
        fontSize: 8.8,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      });
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.55,
      y: 3.64,
      w: 5.15,
      h: 1.48,
      rectRadius: 0.05,
      fill: { color: NAVY },
    });
    slide.addText('რეკლამა vs უშუალო გამოცდილება', {
      x: 0.75,
      y: 3.74,
      w: 4.75,
      h: 0.22,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: TEAL_LIGHT,
      bold: true,
    });
    slide.addText(
      'სტანდარტული რეკლამა: მოსწავლეს უნივერსიტეტზე მხოლოდ ინფორმაციას აწვდის.\n\nNew Vision Innovation Challenge: ქმნის უნივერსიტეტთან უშუალო, დადებით გამოცდილებას ჯერ კიდევ სკოლაში.',
      {
        x: 0.75,
        y: 4.02,
        w: 4.75,
        h: 1.0,
        fontSize: 9.5,
        fontFace: 'Noto Sans Georgian',
        color: WHITE,
      }
    );

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.88,
      y: 3.64,
      w: 3.57,
      h: 1.48,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: BORDER, width: 0.75 },
    });
    slide.addText('თანხვედრა NVU-ის მისიასა და 2025–2031 გეგმასთან', {
      x: 6.06,
      y: 3.74,
      w: 3.21,
      h: 0.24,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: TEAL,
      bold: true,
    });
    slide.addText(
      'კონკურსი აძლიერებს უნივერსიტეტის უკვე არსებულ ღირებულებებს: „Inspire to Care“, კვლევისა და ინოვაციის ხელშეწყობა, SDG-სთან შესაბამისობა და განათლების ხელმისაწვდომობა.',
      {
        x: 6.06,
        y: 4.02,
        w: 3.21,
        h: 1.0,
        fontSize: 9.2,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      }
    );
  }

  // ---------------- SLIDE 4: HOW IT WORKS (1–6 მოსწავლე) ----------------
  {
    const slide = pptx.addSlide();
    addStandardChrome(slide, pptx, 3, logoColor, false);

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.55,
      y: 1.2,
      w: 3.7,
      h: 2.15,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: BORDER, width: 0.75 },
    });
    slide.addText('შემოთავაზებული მოდელი', {
      x: 0.73,
      y: 1.32,
      w: 3.34,
      h: 0.22,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: TEAL,
      bold: true,
    });
    slide.addText(
      'VII–XII კლასები · საჯარო და კერძო სკოლები\nმონაწილეობა: 1–6 მოსწავლე (ინდივიდუალური და გუნდური)\n\nმოქნილი ფორმატი გზას უხსნის როგორც ინდივიდუალურ გამომგონებლებს, ისე დიდ სასკოლო გუნდებს და რთავს მასწავლებლებს.',
      {
        x: 0.73,
        y: 1.62,
        w: 3.34,
        h: 1.6,
        fontSize: 9.5,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      }
    );

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 4.42,
      y: 1.2,
      w: 5.03,
      h: 2.15,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: BORDER, width: 0.75 },
    });
    slide.addText('შემოთავაზებული 6 მიმართულება (NVU-ის პრიორიტეტებით)', {
      x: 4.6,
      y: 1.32,
      w: 4.67,
      h: 0.22,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: TEAL,
      bold: true,
    });
    slide.addText(
      PROPOSED_DIRECTIONS.map((d) => `${d.code}. ${d.name}`).join('\n'),
      {
        x: 4.6,
        y: 1.62,
        w: 4.67,
        h: 1.62,
        fontSize: 9.5,
        fontFace: 'Noto Sans Georgian',
        color: NAVY,
        bold: true,
      }
    );

    const stW = 1.68;
    const stGap = 0.125;
    CONTEST_STAGES.forEach((st, idx) => {
      const x = 0.55 + idx * (stW + stGap);
      const isFinale = idx === 3;
      slide.addShape(pptx.ShapeType.roundRect, {
        x,
        y: 3.52,
        w: stW,
        h: 1.6,
        rectRadius: 0.05,
        fill: { color: isFinale ? NAVY : WHITE },
        line: { color: isFinale ? NAVY : BORDER, width: 0.75 },
      });
      slide.addText(`ეტაპი ${st.step}`, {
        x: x + 0.12,
        y: 3.62,
        w: stW - 0.24,
        h: 0.2,
        fontSize: 8.5,
        fontFace: 'IBM Plex Mono',
        color: isFinale ? TEAL_LIGHT : TEAL,
        bold: true,
      });
      slide.addText(st.title, {
        x: x + 0.12,
        y: 3.84,
        w: stW - 0.24,
        h: 0.42,
        fontSize: 9.5,
        fontFace: 'Noto Sans Georgian',
        color: isFinale ? WHITE : NAVY,
        bold: true,
      });
      slide.addText(st.description, {
        x: x + 0.12,
        y: 4.28,
        w: stW - 0.24,
        h: 0.78,
        fontSize: 8,
        fontFace: 'Noto Sans Georgian',
        color: isFinale ? 'D8E6EC' : MUTED,
      });
    });
  }

  // ---------------- SLIDE 5: SCHOLARSHIPS & PATHWAY ----------------
  {
    const slide = pptx.addSlide();
    addStandardChrome(slide, pptx, 4, logoColor, false);

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.55,
      y: 1.2,
      w: 8.9,
      h: 1.48,
      rectRadius: 0.05,
      fill: { color: NAVY },
    });
    slide.addText('მოსწავლის განვითარების უწყვეტი გზა — სკოლიდან NVU-მდე', {
      x: 0.73,
      y: 1.3,
      w: 8.5,
      h: 0.22,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: TEAL_LIGHT,
      bold: true,
    });

    const nodeW = 1.35;
    const nodeGap = 0.09;
    PATHWAY_NODES.forEach((node, idx) => {
      const x = 0.73 + idx * (nodeW + nodeGap);
      const isLast = idx === 5;
      slide.addShape(pptx.ShapeType.roundRect, {
        x,
        y: 1.6,
        w: nodeW,
        h: 0.94,
        rectRadius: 0.04,
        fill: { color: isLast ? TEAL : '133B52' },
        line: { color: isLast ? TEAL_LIGHT : '2D556B', width: 0.5 },
      });
      slide.addText(`0${node.step}\n${node.label}`, {
        x: x + 0.08,
        y: 1.66,
        w: nodeW - 0.16,
        h: 0.6,
        fontSize: 8.5,
        fontFace: 'Noto Sans Georgian',
        color: WHITE,
        bold: true,
      });
      slide.addText(node.note, {
        x: x + 0.08,
        y: 2.28,
        w: nodeW - 0.16,
        h: 0.2,
        fontSize: 7.2,
        fontFace: 'Noto Sans Georgian',
        color: 'C8E4E8',
      });
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.55,
      y: 2.86,
      w: 4.35,
      h: 2.24,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: BORDER, width: 0.75 },
    });
    slide.addText('შემოთავაზებული მოტივაციისა და დაფინანსების კონცეფცია', {
      x: 0.75,
      y: 3.0,
      w: 3.95,
      h: 0.24,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: TEAL,
      bold: true,
    });
    slide.addText(
      '• სწავლის სრული დაფინანსების შესაძლებლობა განსაკუთრებულად წარმატებული მონაწილეებისთვის\n\n• ნაწილობრივი დაფინანსება, სტიპენდიები და საგანმანათლებლო შეღავათები\n\n• სამეცნიერო მენტორობა და კვლევით აქტივობებში ჩართვა',
      {
        x: 0.75,
        y: 3.35,
        w: 3.95,
        h: 1.6,
        fontSize: 9.8,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      }
    );

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.08,
      y: 2.86,
      w: 4.37,
      h: 2.24,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: BORDER, width: 0.75 },
    });
    slide.addText('სტრატეგიული პრინციპი და სამართლებრივი ჩარჩო', {
      x: 5.28,
      y: 3.0,
      w: 3.97,
      h: 0.24,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: BRONZE,
      bold: true,
    });
    slide.addText(
      'ღირებულია არა მხოლოდ გამარჯვებული, არამედ კონკურსში მონაწილე ყველა დაინტერესებული მოსწავლე (VIII–IX კლასიდანვე).\n\nსამართლებრივი დაზუსტება: ეს არის კონცეპტუალური მოდელი — დაფინანსების პირობებსა და მოცულობას განსაზღვრავს NVU. გამარჯვება არ გულისხმობს ავტომატურ ჩარიცხვას.',
      {
        x: 5.28,
        y: 3.35,
        w: 3.97,
        h: 1.6,
        fontSize: 9.8,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      }
    );
  }

  // ---------------- SLIDE 6: WHY WE CAN DELIVER + re:school ----------------
  {
    const slide = pptx.addSlide();
    addStandardChrome(slide, pptx, 5, logoColor, false);

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.55,
      y: 1.2,
      w: 8.9,
      h: 0.64,
      rectRadius: 0.05,
      fill: { color: NAVY },
    });
    slide.addText(
      '„ჩვენ ამ კონკურსებს ვიცნობთ არა მხოლოდ ორგანიზატორის, არამედ მონაწილის, ფინალისტისა და გამარჯვებულის გამოცდილებიდან.“',
      {
        x: 0.75,
        y: 1.28,
        w: 8.5,
        h: 0.48,
        fontSize: 11.5,
        fontFace: 'Noto Serif Georgian',
        color: WHITE,
      }
    );

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.55,
      y: 1.98,
      w: 4.35,
      h: 3.12,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: BORDER, width: 0.75 },
    });
    slide.addText('ინიციატივის ავტორები', {
      x: 0.75,
      y: 2.1,
      w: 3.95,
      h: 0.22,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: TEAL,
      bold: true,
    });
    slide.addText('ანრი ყუფარაძე და ნატა სულაქველიძე', {
      x: 0.75,
      y: 2.34,
      w: 3.95,
      h: 0.34,
      fontSize: 14.5,
      fontFace: 'Noto Serif Georgian',
      color: NAVY,
      bold: true,
    });

    slide.addText(
      'საქართველოში ჩატარებული სამეცნიერო და ინოვაციური კონკურსების მრავალგზის გამარჯვებულები და ფინალისტები — მოსწავლის, ფინალისტისა და გამარჯვებულის პრაქტიკული გამოცდილებით:',
      {
        x: 0.75,
        y: 2.78,
        w: 3.95,
        h: 0.9,
        fontSize: 9.2,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      }
    );

    slide.addText(
      '• სამეცნიერო პროექტების მომზადება და ეტაპების მექანიკა\n• ჟიურის შეფასების კრიტერიუმები და დაცვის მომზადება\n• მოსწავლეებისა და გუნდების პრაქტიკული მოტივაცია\n• სწავლება re:school-ში',
      {
        x: 0.75,
        y: 3.74,
        w: 3.95,
        h: 1.22,
        fontSize: 9,
        fontFace: 'Noto Sans Georgian',
        color: NAVY,
      }
    );

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.08,
      y: 1.98,
      w: 4.37,
      h: 1.48,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: BORDER, width: 0.75 },
    });
    slide.addText('საპროექტო და საორგანიზაციო კომპეტენცია', {
      x: 5.28,
      y: 2.1,
      w: 3.97,
      h: 0.22,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: TEAL,
      bold: true,
    });
    slide.addText(
      'პრაქტიკული გამოცდილება ინჟინერიაში, პროტოტიპირებაში, ტექნოლოგიური და კვლევითი პროექტების სტრუქტურირებაში — იდეის ჩამოყალიბებიდან ფინალურ გამოფენაზე წარდგენამდე.',
      {
        x: 5.28,
        y: 2.38,
        w: 3.97,
        h: 0.96,
        fontSize: 9.5,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      }
    );

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.08,
      y: 3.62,
      w: 4.37,
      h: 1.48,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: BORDER, width: 0.75 },
    });
    slide.addText('უნივერსიტეტთან თანამშრომლობის მოდელი', {
      x: 5.28,
      y: 3.74,
      w: 3.97,
      h: 0.22,
      fontSize: 9,
      fontFace: 'Noto Sans Georgian',
      color: BRONZE,
      bold: true,
    });
    slide.addText(
      '• NVU: აკადემიური მიმართულებები, პროფესორთა მენტორობა, კამპუსი და სტიპენდიების პოლიტიკა.\n• ინიციატორები: კონკურსის მეთოდოლოგია, საორგანიზაციო კოორდინაცია და პროექტების მომზადების მხარდაჭერა.',
      {
        x: 5.28,
        y: 4.02,
        w: 3.97,
        h: 0.94,
        fontSize: 9.3,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      }
    );
  }

  // ---------------- SLIDE 7: 5-YEAR VISION & BOARD PROPOSAL ----------------
  {
    const slide = pptx.addSlide();
    addStandardChrome(slide, pptx, 6, logoWhite, true);

    const years = [
      { y: 'წელი 01', t: 'დაფუძნება', d: 'პირველი სეზონი, სკოლებთან ურთიერთობა, ფინალური გამოფენა.' },
      { y: 'წელი 02–03', t: 'გაფართოება', d: 'მეტი სკოლა, რეგიონული ზრდა და NVU-ის მენტორობა.' },
      { y: 'წელი 04–05', t: 'ეროვნული ბრენდი', d: 'საქართველოში ახალგაზრდა გამომგონებელთა წამყვანი პლატფორმა.' },
    ];

    years.forEach((yr, idx) => {
      const x = 0.55 + idx * 1.78;
      slide.addShape(pptx.ShapeType.roundRect, {
        x,
        y: 1.24,
        w: 1.66,
        h: 1.98,
        rectRadius: 0.05,
        fill: { color: idx === 2 ? TEAL : '0D3850' },
        line: { color: idx === 2 ? TEAL_LIGHT : '275068', width: 0.6 },
      });
      slide.addText(yr.y, {
        x: x + 0.14,
        y: 1.36,
        w: 1.38,
        h: 0.22,
        fontSize: 8.5,
        fontFace: 'IBM Plex Mono',
        color: TEAL_LIGHT,
        bold: true,
      });
      slide.addText(yr.t, {
        x: x + 0.14,
        y: 1.62,
        w: 1.38,
        h: 0.34,
        fontSize: 12,
        fontFace: 'Noto Serif Georgian',
        color: WHITE,
        bold: true,
      });
      slide.addText(yr.d, {
        x: x + 0.14,
        y: 2.02,
        w: 1.38,
        h: 1.05,
        fontSize: 8.5,
        fontFace: 'Noto Sans Georgian',
        color: 'E0ECF2',
      });
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.55,
      y: 3.36,
      w: 5.22,
      h: 1.12,
      rectRadius: 0.05,
      fill: { color: '0D3850' },
      line: { color: '275068', width: 0.6 },
    });
    slide.addText('გაზომვადი შედეგები (8 KPI · პერსონალურ მონაცემთა დაცვის სრული დაცვით)', {
      x: 0.72,
      y: 3.46,
      w: 4.88,
      h: 0.22,
      fontSize: 8.5,
      fontFace: 'Noto Sans Georgian',
      color: TEAL_LIGHT,
      bold: true,
    });
    slide.addText(
      '• ჩართული სკოლების, გუნდების და მოსწავლეების რაოდენობა\n• რეგიონული წარმომადგენლობა და ფინალზე დასწრება\n• შემდგომ წლებში NVU-ში განაცხადებისა და ჩარიცხვების დინამიკა',
      {
        x: 0.72,
        y: 3.74,
        w: 4.88,
        h: 0.68,
        fontSize: 8.5,
        fontFace: 'Noto Sans Georgian',
        color: WHITE,
      }
    );

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.95,
      y: 1.24,
      w: 3.5,
      h: 3.24,
      rectRadius: 0.05,
      fill: { color: WHITE },
    });
    slide.addText('შეთავაზება საბჭოსთვის (ბიუჯეტის გარეშე)', {
      x: 6.14,
      y: 1.38,
      w: 3.12,
      h: 0.24,
      fontSize: 8.5,
      fontFace: 'Noto Sans Georgian',
      color: TEAL,
      bold: true,
    });
    slide.addText('ოთხი საწყისი ნაბიჯი', {
      x: 6.14,
      y: 1.66,
      w: 3.12,
      h: 0.3,
      fontSize: 14,
      fontFace: 'Noto Serif Georgian',
      color: NAVY,
      bold: true,
    });
    slide.addText(
      '01. ინიციატივის კონცეპტუალური მხარდაჭერა\n\n02. უნივერსიტეტის მხრიდან საკონტაქტო წარმომადგენლების განსაზღვრა\n\n03. ერთობლივი სამუშაო ჯგუფის ჩამოყალიბება\n\n04. პირველი სეზონის დეტალური კონცეფციის მომზადება',
      {
        x: 6.14,
        y: 2.08,
        w: 3.12,
        h: 2.25,
        fontSize: 9.5,
        fontFace: 'Noto Sans Georgian',
        color: INK,
      }
    );

    slide.addText(
      '„ჩვენ გთავაზობთ შესაძლებლობას, რომ New Vision University გახდეს ადგილი, სადაც საქართველოს მომავალი მეცნიერები და გამომგონებლები პირველ მნიშვნელოვან ნაბიჯებს გადადგამენ.“',
      {
        x: 0.55,
        y: 4.62,
        w: 8.9,
        h: 0.54,
        fontSize: 10.5,
        fontFace: 'Noto Serif Georgian',
        color: 'E5F2F4',
      }
    );
  }

  await pptx.writeFile({ fileName: 'New_Vision_Innovation_Challenge_Board_Presentation.pptx' });
}
