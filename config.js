/*
==========================================================
Week 6 Configuration
Everything editable lives here.
==========================================================
*/

window.AppConfig = {

    /*
    ======================================================
    Background Music
    ======================================================
    */

    audio: {
        src: "assets/song.mp3",
        loop: true,
        volume: 0.45
    },

    /*
    ======================================================
    Sections
    ======================================================
    */

    sections: {

        camera: {

            id: "camera",

            label: "Camera",

            heading: "ur hottest selfie aaaaaa",

            imagePath: "assets/picture-icon.png",

            messageText:
`Every picture with you becomes my favorite.

I don't know how you do it,
but somehow every moment feels warmer,
every smile feels brighter,
and every memory becomes something
I never want to lose.

Thank you for filling my life
with moments worth remembering forever.`

        },

        music: {

            id: "music",

            label: "Our Song",

            imagePath: "assets/song-icon.png",

            messageText:
`I don't think I've ever related to a song this quietly before.

It made me realize that I can tell people a hundred things about myself, 
but somehow every answer feels incomplete if it doesn't lead back to you. 

Because the happiest version of me, 
the one who smiles a little wider, 
laughs a little louder, 
and loves a little deeper, 
only seems to exist when I'm with you. 

Maybe that's why you're not just part of my story—
you've become the best part of who I am.
`

        },

        flower: {

            id: "flower",

            label: "Flowers",

            heading: "Queen Protea",

            imagePath: "assets/flora-icon.png",

            messageText:
`They say the Queen Protea symbolizes uniqueness, 
and I think that's why it reminds me of you. 

Not because you're flawless, but because there's no one else who could ever be you. 

Your little quirks, 
your rough edges, your quiet kindness—
they're the very things that make you so beautiful to me. 

You don't bloom by trying to be like everyone else; 
you bloom simply by being yourself. 

And every day, I find another reason to admire the person you are. 
Because just like this flower, your beauty isn't found in perfection—
it's found in the way you're wonderfully, irreplaceably you. 

And I wouldn't change a single petal.
`

        },

        mail: {

            id: "mail",

            label: "Letter",

            heading: "My Love",

            imagePath: "assets/photo.png",

            messageText:
`I realized something today.

If someone asked me who I am,
whether it was a friend wanting to know me,
or an interviewer asking me to introduce myself,
I could probably answer with ease.

I could tell them about the things I love,
the dreams I keep,
the fears I hide,
the roads I've walked and the ones I still hope to find.

I could tell them everything.

But somehow...

It never feels complete.

Because somewhere between every answer,
there is a space shaped exactly like you.

How do I speak about myself
without speaking about the person
who quietly became part of every version of me?

How do I tell my story
when you've become the gentlest line
in every chapter I call my own?

Then it finally made sense.

The best part of me
isn't something I discovered alone.

It only came to life
when life led me to you.

The smile people know me for,
they've never seen its fullest bloom.

The laughter they hear,
they've only heard an echo.

Because the widest smile I have ever worn
has always belonged to the moments
where my eyes were looking at you.

Maybe that's why words always fall short.

No introduction could ever explain you.
No self-description could ever tell them
why I became softer, calmer, kinder.

They would only understand
if they watched the way my world slows down
the moment you walk into it.

So if anyone ever asks me who I am,

I think the truest answer is this—

I'm simply someone who found the best part of himself...

when he found you.`

        }

    }

};

/*
==========================================================
Freeze Configuration
Prevents accidental modification.
==========================================================
*/

Object.freeze(window.AppConfig.audio);

Object.keys(window.AppConfig.sections).forEach(key => {
    Object.freeze(window.AppConfig.sections[key]);
});

Object.freeze(window.AppConfig.sections);

Object.freeze(window.AppConfig);