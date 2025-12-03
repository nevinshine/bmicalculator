import { Component, computed, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen relative bg-[#0f172a] flex items-center justify-center p-4 font-sans text-white overflow-hidden selection:bg-cyan-500 selection:text-white">
      
      <!-- Liquid Background Blobs -->
      <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
      <div class="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <!-- Splash Screen -->
      <div *ngIf="isLoading()" class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-xl bg-black/60 animate-fade-out">
        <div class="relative flex items-center justify-center">
          <div class="absolute w-32 h-32 rounded-full border-2 border-cyan-400/20 animate-ping-slow"></div>
          <div class="absolute w-32 h-32 rounded-full border border-cyan-400/40 animate-spin-slow"></div>
          <div class="relative w-24 h-24 bg-cyan-500/10 backdrop-blur-md rounded-full flex items-center justify-center border border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.3)] animate-pulse-gentle">
            <span class="text-3xl">💧</span>
          </div>
        </div>
        <div class="mt-8 font-light text-cyan-200/80 tracking-[0.3em] text-xs animate-pulse">LOADING</div>
      </div>

      <!-- Main App Container -->
      <div *ngIf="!isLoading()" class="relative w-full max-w-md transition-all duration-500">
        
        <!-- ==================== VIEW 1: INPUT CALCULATOR ==================== -->
        <div *ngIf="view() === 'input'" class="animate-zoom-in flex flex-col gap-8">
          
          <!-- Floating Header -->
          <div class="text-center py-4">
            <h1 class="text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-100 to-blue-200 drop-shadow-[0_2px_15px_rgba(6,182,212,0.5)]">BMI</h1>
            <div class="flex items-center justify-center gap-2 mt-2 opacity-60">
               <div class="h-px w-8 bg-cyan-200/50"></div>
               <p class="text-cyan-100 text-[10px] font-bold tracking-[0.3em] uppercase">Calculator</p>
               <div class="h-px w-8 bg-cyan-200/50"></div>
            </div>
          </div>

          <!-- Unit Toggle -->
          <div class="mx-auto w-full max-w-[280px] p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl relative h-14 flex items-center shadow-lg">
            <div class="absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-500 cubic-bezier-spring"
                 [style.left.%]="unit() === 'metric' ? '1.5' : '50.5'"
                 [style.width.%]="48"></div>
            
            <button (click)="setUnit('metric')" class="relative flex-1 text-xs font-bold tracking-widest z-10 transition-colors duration-300" [ngClass]="{'text-white': unit() === 'metric', 'text-white/40': unit() !== 'metric'}">METRIC</button>
            <button (click)="setUnit('imperial')" class="relative flex-1 text-xs font-bold tracking-widest z-10 transition-colors duration-300" [ngClass]="{'text-white': unit() === 'imperial', 'text-white/40': unit() !== 'imperial'}">IMPERIAL</button>
          </div>

          <!-- Inputs -->
          <form [formGroup]="bmiForm" class="space-y-6 px-2">
            <div class="relative group">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div class="relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                 <input 
                    type="number" 
                    formControlName="weight"
                    class="w-full bg-transparent py-5 px-6 text-center font-bold text-3xl text-white placeholder-white/20 outline-none rounded-full transition-all"
                    placeholder="0">
                 <span class="absolute right-8 text-cyan-200/60 text-xs font-bold tracking-wider pointer-events-none">
                    {{ unit() === 'metric' ? 'KG' : 'LBS' }}
                 </span>
                 <span class="absolute left-8 text-cyan-200/40 text-[10px] font-bold uppercase tracking-widest pointer-events-none">Weight</span>
              </div>
            </div>

            <div *ngIf="unit() === 'metric'" class="relative group">
               <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
               <div class="relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                 <input 
                    type="number" 
                    formControlName="heightCm"
                    class="w-full bg-transparent py-5 px-6 text-center font-bold text-3xl text-white placeholder-white/20 outline-none rounded-full transition-all"
                    placeholder="0">
                 <span class="absolute right-8 text-cyan-200/60 text-xs font-bold tracking-wider pointer-events-none">CM</span>
                 <span class="absolute left-8 text-cyan-200/40 text-[10px] font-bold uppercase tracking-widest pointer-events-none">Height</span>
               </div>
            </div>

            <div *ngIf="unit() === 'imperial'" class="flex gap-4">
              <div class="relative group flex-1">
                 <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                 <div class="relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                    <input type="number" formControlName="heightFt" class="w-full bg-transparent py-5 px-4 text-center font-bold text-3xl text-white placeholder-white/20 outline-none rounded-full" placeholder="0">
                    <span class="absolute right-5 text-cyan-200/60 text-xs font-bold tracking-wider pointer-events-none">FT</span>
                 </div>
              </div>
              <div class="relative group flex-1">
                 <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                 <div class="relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                    <input type="number" formControlName="heightIn" class="w-full bg-transparent py-5 px-4 text-center font-bold text-3xl text-white placeholder-white/20 outline-none rounded-full" placeholder="0">
                    <span class="absolute right-5 text-cyan-200/60 text-xs font-bold tracking-wider pointer-events-none">IN</span>
                 </div>
              </div>
            </div>
          </form>

          <!-- Calculate Button -->
          <div class="px-2 pt-4">
            <button 
              (click)="goToResult()"
              [disabled]="bmiForm.invalid || !hasValidInput()"
              class="relative group w-full overflow-hidden rounded-full p-[1px] shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x"></div>
              <div class="relative bg-slate-900/90 hover:bg-slate-900/70 backdrop-blur-xl rounded-full py-5 flex items-center justify-center transition-all">
                <span class="text-lg font-black uppercase tracking-[0.2em] text-white">Calculate Result</span>
              </div>
            </button>
          </div>
        </div>

        <!-- ==================== VIEW 2: RESULTS PAGE ==================== -->
        <div *ngIf="view() === 'result'" class="animate-slide-up flex flex-col gap-6 h-full pb-8">
          
          <!-- Top Bar -->
          <div class="flex items-center justify-between px-2 pt-2">
            <button (click)="backToInput()" class="flex items-center gap-2 text-cyan-200/70 hover:text-white transition-colors group">
              <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </div>
              <span class="text-xs font-bold uppercase tracking-widest">Back</span>
            </button>
            
            <button (click)="copyResult()" class="flex items-center gap-2 text-cyan-200/70 hover:text-white transition-colors group relative">
              <span *ngIf="showCopied()" class="absolute -bottom-8 right-0 text-[10px] bg-white text-slate-900 px-2 py-1 rounded-md font-bold animate-fade-in">COPIED!</span>
              <span class="text-xs font-bold uppercase tracking-widest">Share</span>
              <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.287.696.345 1.093m0-1.093a2.25 2.25 0 000-2.186m0-2.186c-.18.324-.287.696-.345 1.093m0-1.093a2.25 2.25 0 100 2.186m0-2.186a2.25 2.25 0 100-2.186m0 2.186c.18-.324.287-.696.345-1.093" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </button>
          </div>

          <!-- Circular Result Display -->
          <div class="relative flex justify-center py-4">
             <!-- Main Circle -->
             <div class="relative z-10 w-64 h-64 rounded-full flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <!-- Inner Glow Ring -->
                <div class="absolute inset-3 rounded-full border border-white/5"></div>
                
                <div class="text-8xl font-black text-white drop-shadow-2xl tracking-tighter">
                  {{ bmiResult() | number:'1.1-1' }}
                </div>
                <div class="mt-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black tracking-widest uppercase backdrop-blur-md shadow-inner" [class]="categoryColorClass()">
                  {{ bmiCategory() }}
                </div>
             </div>
             
             <!-- Glow Behind -->
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl -z-10"></div>
          </div>

          <!-- Progress Bar -->
          <div class="px-4 -mt-2">
            <div class="flex justify-between text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 px-1">
              <span>Low</span>
              <span>Normal</span>
              <span>High</span>
            </div>
            <div class="relative h-4 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
               <div class="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-500 via-green-500 to-red-500"></div>
               <div class="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-1000 cubic-bezier-spring rounded-full"
                    [style.width.%]="clampedPercentage()">
               </div>
            </div>
          </div>

          <!-- NEW FEATURES: Stats Cards (Ideal Weight & Water) -->
          <div class="grid grid-cols-2 gap-3 px-2">
             <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all">
                <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">⚖️</div>
                <div class="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Ideal Range</div>
                <div class="text-sm font-bold text-white tracking-wide">{{ idealWeightRange() }}</div>
             </div>
             <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all">
                <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">💧</div>
                <div class="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Daily Water</div>
                <div class="text-sm font-bold text-white tracking-wide">{{ waterIntake() }}</div>
             </div>
          </div>

          <!-- Food Icons Grid -->
          <div class="px-2">
            <div class="grid grid-cols-3 gap-3">
               <div *ngFor="let food of foodRecommendations()" class="bg-white/5 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-4 text-center hover:bg-white/10 transition-colors group cursor-default">
                  <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{{ food.icon }}</div>
                  <div class="text-[9px] font-bold text-white/90 uppercase tracking-wider">{{ food.name }}</div>
                  <div class="text-[8px] text-white/40 mt-1 leading-tight">{{ food.desc }}</div>
               </div>
            </div>
          </div>

          <!-- Pre-defined Meal Plan & Workout -->
          <div class="px-2 flex flex-col gap-4">
             
             <!-- Meal Plan Card -->
             <div class="bg-gradient-to-br from-indigo-900/60 to-blue-900/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div class="relative z-10">
                  <div class="flex items-center gap-3 mb-4">
                     <div class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-lg shadow-inner border border-white/5">🥗</div>
                     <div class="text-xs text-blue-200 font-bold uppercase tracking-widest">Daily Meal Plan</div>
                  </div>
                  <div class="text-sm text-white/90 whitespace-pre-wrap leading-7 font-light tracking-wide border-l-2 border-blue-500/30 pl-4">
                     {{ staticMealPlan() }}
                  </div>
                </div>
             </div>

             <!-- Workout Plan Card -->
             <div class="bg-gradient-to-br from-orange-900/60 to-rose-900/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div class="relative z-10">
                  <div class="flex items-center gap-3 mb-4">
                     <div class="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-lg shadow-inner border border-white/5">🏋️</div>
                     <div class="text-xs text-orange-200 font-bold uppercase tracking-widest">Recommended Routine</div>
                  </div>
                  <div class="text-sm text-white/90 whitespace-pre-wrap leading-7 font-light tracking-wide border-l-2 border-orange-500/30 pl-4">
                     {{ staticWorkoutPlan() }}
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .cubic-bezier-spring {
      transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    /* Animations */
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob { animation: blob 10s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }

    .animate-zoom-in { animation: zoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    .animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    .animate-ping-slow { animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
    .animate-spin-slow { animation: spin 8s linear infinite; }
    .animate-pulse-gentle { animation: pulseGentle 3s ease-in-out infinite; }
    
    @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulseGentle { 
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
  `]
})
export class App implements OnInit {
  private fb = inject(FormBuilder);

  isLoading = signal(true);
  unit = signal<'metric' | 'imperial'>('metric');
  view = signal<'input' | 'result'>('input');
  showCopied = signal(false);
  
  bmiForm = this.fb.group({
    weight: ['', [Validators.required, Validators.min(1)]],
    heightCm: ['', [Validators.min(1)]],
    heightFt: ['', [Validators.min(1)]],
    heightIn: ['', [Validators.min(0), Validators.max(11)]]
  });
  
  bmiResult = signal<number>(0);
  
  bmiCategory = computed(() => {
    const bmi = this.bmiResult();
    if (bmi === 0) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  });

  categoryColorClass = computed(() => {
    const cat = this.bmiCategory();
    switch(cat) {
      case 'Underweight': return 'text-blue-300 shadow-[0_0_10px_rgba(147,197,253,0.5)]';
      case 'Normal weight': return 'text-green-300 shadow-[0_0_10px_rgba(134,239,172,0.5)]';
      case 'Overweight': return 'text-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.5)]';
      case 'Obese': return 'text-red-300 shadow-[0_0_10px_rgba(252,165,165,0.5)]';
      default: return 'text-white';
    }
  });

  // New Feature: Healthy Weight Range Calculation (BMI 18.5 - 24.9)
  idealWeightRange = computed(() => {
    const u = this.unit();
    const val = this.bmiForm.value;
    
    // Calculate height in meters/inches
    let heightM = 0;
    let heightIn = 0;

    if (u === 'metric') {
      const h = parseFloat(val.heightCm || '0');
      if (!h) return '--';
      heightM = h / 100;
    } else {
      const ft = parseFloat(val.heightFt || '0');
      const inch = parseFloat(val.heightIn || '0');
      if (!ft && !inch) return '--';
      heightIn = (ft * 12) + inch;
      heightM = heightIn * 0.0254; // Convert to meters for formula
    }

    if (heightM <= 0) return '--';

    // Formula: Weight = BMI * Height^2
    const minKg = 18.5 * heightM * heightM;
    const maxKg = 24.9 * heightM * heightM;

    if (u === 'metric') {
      return `${minKg.toFixed(1)} - ${maxKg.toFixed(1)} kg`;
    } else {
      const minLb = minKg * 2.20462;
      const maxLb = maxKg * 2.20462;
      return `${minLb.toFixed(0)} - ${maxLb.toFixed(0)} lbs`;
    }
  });

  // New Feature: Daily Water Intake (Weight * 0.033)
  waterIntake = computed(() => {
    const u = this.unit();
    const w = parseFloat(this.bmiForm.value.weight || '0');
    
    if (!w || w <= 0) return '--';

    let weightKg = w;
    if (u === 'imperial') {
      weightKg = w * 0.453592;
    }

    // Basic recommendation: ~33ml per kg
    const liters = weightKg * 0.033;
    
    if (u === 'metric') {
      return `${liters.toFixed(1)} L / day`;
    } else {
      // Convert to oz
      const oz = liters * 33.814;
      return `${Math.round(oz)} oz / day`;
    }
  });

  foodRecommendations = computed(() => {
    const cat = this.bmiCategory();
    switch(cat) {
      case 'Underweight':
        return [
          { icon: '🥑', name: 'Healthy Fats', desc: 'Avocados & Nuts' },
          { icon: '🥩', name: 'Protein', desc: 'Red Meat & Fish' },
          { icon: '🍚', name: 'Carbs', desc: 'Rice & Oats' }
        ];
      case 'Normal weight':
        return [
          { icon: '🥗', name: 'Greens', desc: 'Fresh Veggies' },
          { icon: '🍗', name: 'Lean Protein', desc: 'Chicken & Tofu' },
          { icon: '🍎', name: 'Fruits', desc: 'Berries & Apples' }
        ];
      case 'Overweight':
        return [
          { icon: '🥬', name: 'High Fiber', desc: 'Broccoli & Kale' },
          { icon: '🐟', name: 'White Meat', desc: 'Fish & Turkey' },
          { icon: '🥣', name: 'Grains', desc: 'Oats (Portioned)' }
        ];
      case 'Obese':
        return [
          { icon: '🥒', name: 'Low Calorie', desc: 'Cucumber & Celery' },
          { icon: '🥜', name: 'Legumes', desc: 'Lentils & Beans' },
          { icon: '💧', name: 'Hydration', desc: 'Water & Tea' }
        ];
      default: return [];
    }
  });

  staticMealPlan = computed(() => {
    const cat = this.bmiCategory();
    switch(cat) {
      case 'Underweight':
        return "• Breakfast: Oatmeal with peanut butter, banana & whole milk.\n• Lunch: Grilled chicken breast with quinoa salad & avocado.\n• Snack: Greek yogurt with honey & granola.\n• Dinner: Salmon fillet with roasted sweet potatoes & asparagus.";
      case 'Normal weight':
        return "• Breakfast: Scrambled eggs with spinach & whole wheat toast.\n• Lunch: Turkey & hummus wrap with mixed greens.\n• Snack: Apple slices with almond butter.\n• Dinner: Stir-fried tofu with mixed vegetables & brown rice.";
      case 'Overweight':
        return "• Breakfast: Green smoothie (spinach, protein powder, berries).\n• Lunch: Lentil soup with a side of mixed greens (vinegar dressing).\n• Snack: A handful of raw almonds & a pear.\n• Dinner: Baked white fish with steamed broccoli & cauliflower rice.";
      case 'Obese':
        return "• Breakfast: Egg white omelet with peppers, onions & spinach.\n• Lunch: Large grilled chicken salad with lemon-tahini dressing.\n• Snack: Carrot sticks & celery with hummus.\n• Dinner: Zucchini noodles with turkey marinara sauce.";
      default: return "Calculate your BMI to see a plan.";
    }
  });

  staticWorkoutPlan = computed(() => {
    const cat = this.bmiCategory();
    switch(cat) {
      case 'Underweight':
        return "Focus: Strength & Muscle Building\n• Warmup: 5 min light jog\n• Squats: 3 sets of 10 reps\n• Push-ups: 3 sets of 8 reps (knees if needed)\n• Lunges: 3 sets of 10 per leg\n• Cooldown: 5 min stretching";
      case 'Normal weight':
        return "Focus: General Fitness & Endurance\n• Warmup: 5 min jumping jacks/high knees\n• Burpees: 3 sets of 10 reps\n• Mountain Climbers: 3 sets of 20 secs\n• Plank: 3 sets of 30-45 secs\n• Cooldown: 5 min stretching";
      case 'Overweight':
        return "Focus: Fat Burn & Mobility\n• Warmup: 5 min brisk walking/marching in place\n• Step-ups (on sturdy chair): 3 sets of 10 per leg\n• Bodyweight Squats: 3 sets of 12 reps\n• Standing Side Crunches: 3 sets of 15 per side\n• Cooldown: 5 min gentle stretching";
      case 'Obese':
        return "Focus: Low Impact & Joint Health\n• Warmup: 5 min arm circles & gentle marching\n• Wall Push-ups: 3 sets of 10 reps\n• Seated Leg Lifts: 3 sets of 12 per leg\n• Standing Marches: 3 sets of 30 secs\n• Cooldown: 5 min breathing & stretching";
      default: return "Calculate your BMI to see a routine.";
    }
  });

  clampedPercentage = computed(() => {
    const bmi = this.bmiResult();
    const min = 15;
    const max = 40;
    const percentage = ((bmi - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, percentage));
  });

  constructor() {
    this.bmiForm.valueChanges.subscribe(() => {
      // Optional realtime listener
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  setUnit(newUnit: 'metric' | 'imperial') {
    this.unit.set(newUnit);
    this.bmiForm.reset();
    this.bmiResult.set(0);
  }

  hasValidInput() {
    const val = this.bmiForm.value;
    if (this.unit() === 'metric') {
      return val.weight && val.heightCm;
    } else {
      return val.weight && val.heightFt && (val.heightIn !== null && val.heightIn !== undefined);
    }
  }

  goToResult() {
    this.calculateBMI();
    if (this.bmiResult() > 0) {
      this.view.set('result');
    }
  }

  backToInput() {
    this.view.set('input');
  }

  // Use document.execCommand as a safe fallback for iframe restrictions
  copyResult() {
    const text = `My BMI is ${this.bmiResult().toFixed(1)} (${this.bmiCategory()}). Ideal weight: ${this.idealWeightRange()}.`;
    
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if(successful) {
            this.showCopied.set(true);
            setTimeout(() => this.showCopied.set(false), 2000);
        }
    } catch (err) {
        console.error('Unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  calculateBMI() {
    const val = this.bmiForm.value;
    const weight = parseFloat(val.weight || '0');
    
    if (!weight || weight <= 0) {
      this.bmiResult.set(0);
      return;
    }

    let calculatedBmi = 0;

    if (this.unit() === 'metric') {
      const heightCm = parseFloat(val.heightCm || '0');
      if (heightCm > 0) {
        const heightM = heightCm / 100;
        calculatedBmi = weight / (heightM * heightM);
      }
    } else {
      const ft = parseFloat(val.heightFt || '0');
      const inch = parseFloat(val.heightIn || '0');
      const totalInches = (ft * 12) + inch;
      
      if (totalInches > 0) {
        calculatedBmi = (weight / (totalInches * totalInches)) * 703;
      }
    }

    if (calculatedBmi > 0 && calculatedBmi < 200) {
      this.bmiResult.set(calculatedBmi);
    } else {
      this.bmiResult.set(0);
    }
  }
}